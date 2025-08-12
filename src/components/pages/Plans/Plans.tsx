import {FC, useEffect, useRef} from "react";
import {useGetPlansLink} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const Plans: FC = () => {
    const name = useGetShopName()
    const { data } = useGetPlansLink(name || 'wand-test-store');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        function handleMessage(event: any) {
            console.log("Received message:", event.data);
        }

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
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