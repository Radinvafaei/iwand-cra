import {FC, useEffect, useRef} from "react";
import {useGetPlansLink} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const Plans: FC = () => {
    const name = useGetShopName()
    const { data } = useGetPlansLink(name || 'wand-test-store');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        try {
            console.log("Iframe element:", iframe);
            console.log("Iframe src:", iframe.src);
            if (iframe.contentWindow) {
                console.log("Iframe contentWindow موجود هست", iframe.contentWindow);

                try {
                    console.log(
                        "Iframe document:",
                        iframe.contentWindow.document // احتمالاً خطای security
                    );
                } catch (err) {
                    console.error("❌ دسترسی به document داخل iframe مسدود شد:", err);
                }
            }
        } catch (error) {
            console.error("خطا در خواندن iframe:", error);
        }
    }, []);
    if(!data?.data){
        return <Spinner accessibilityLabel="Spinner example" size="large" />;
    }
    return (
        <div style={{height: "100vh"}}>
            <iframe
                ref={iframeRef}
                src={data.data.plans_url}
                title="Billing Plans"
                style={{width: "100%", height: "100%", border: 0}}
                allow="payment *; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation"
            />
        </div>
    )
}

export default Plans;
//Current plan
//Subscribe