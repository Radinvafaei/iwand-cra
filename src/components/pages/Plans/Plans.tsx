import {FC, useEffect, useRef} from "react";
import {useGetPlansLink} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const Plans: FC = () => {
    const name = useGetShopName()
    const { data } = useGetPlansLink(name || 'wand-test-store');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if(iframeRef.current){
            iframeRef.current.contentWindow?.postMessage('requestContent', 'http://example.com');
            window.addEventListener('message', function(event) {
                if (event.origin === window.location.origin) {
                    if (event.data === 'requestContent') {
                        event.source?.postMessage(document.body.innerHTML, {
                            targetOrigin: event.origin
                        });
                    }
                }
            });
        }
    }, []);

    if(!data?.data){
        return <Spinner accessibilityLabel="Spinner example" size="large" />;
    }
    return (
        <div style={{height: "100vh"}}>
            <iframe
                id="myIframeId"
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