import {useEffect, useState} from "react";

const useEmbedding = () => {
    const [isEmbedded, setIsEmbedded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const shop = urlParams.get("shop");
        const embedded = urlParams.get("embedded") === "1";
        const inIframe = window.top !== window.self;

        setIsEmbedded(!!(inIframe && (embedded || shop)));
        setIsReady(true);
    }, []);

    return { isEmbedded, isReady };
};

export default useEmbedding;