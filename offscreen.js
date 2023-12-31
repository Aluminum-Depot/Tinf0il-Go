const tabs = {};
chrome.runtime.onMessage.addListener((async e => {
    if ("offscreen" === e.target)
        if ("convertType" === e.name) convertImageAsType(e.dataUrl, e.filename, e.imageFormat);
        else {
            const a = e.streamId,
                t = e.tabId,
                n = e.value;
            "startRecording" === e.name && await captureTab(a, t), "setVolume" === e.name || "startRecording" === e.name ? (tabs[t].gainNode.gain.value = n, chrome.runtime.sendMessage({
                name: "updateVolume",
                target: "background",
                tabId: t,
                value: n
            })) : "disposeTab" === e.name && (tabs[t].audioContext.close(), delete tabs[t], chrome.runtime.sendMessage({
                name: "disposeTab",
                target: "background",
                tabId: t
            }))
        }
}));
const captureTab = async (e, a) => {
    const t = await navigator.mediaDevices.getUserMedia({
            audio: {
                mandatory: {
                    chromeMediaSource: "tab",
                    chromeMediaSourceId: e
                }
            }
        }),
        n = new AudioContext,
        o = n.createMediaStreamSource(t),
        r = n.createGain();
    o.connect(r), r.connect(n.destination), tabs[a] = {
        audioContext: n,
        gainNode: r
    }
}, convertImageToDataURL = (e, a) => {
    const t = document.createElement("canvas");
    t.width = e.width, t.height = e.height;
    const n = `image/${"jpg" === a ? "jpeg" : a}`;
    return t.getContext("2d").drawImage(e, 0, 0), t.toDataURL(n)
}, imageLoad = (e, a) => new Promise(((t, n) => {
    const o = new Image;
    o.onload = () => {
        t(convertImageToDataURL(o, a))
    }, o.onerror = () => {
        n(new Error("Image load error"))
    }, o.src = e
})), convertImageAsType = (e, a, t) => {
    imageLoad(e, t).then((e => {
        chrome.runtime.sendMessage({
            name: "downloadImage",
            target: "background",
            filename: a,
            dataUrl: e
        })
    })).catch((e => {
        console.error(e)
    }))
};