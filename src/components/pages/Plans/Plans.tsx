import {FC} from "react";
import {useGetPlansLink} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const Plans: FC = () => {
    const name = useGetShopName()
    const { data } = useGetPlansLink(name || 'wand-test-store');
    if(!data?.data){
        return <Spinner accessibilityLabel="Spinner example" size="large" />;
    }
    return (
        <div style={{height: "100vh"}}>
            <iframe
                src={data.data.plans_url}
                title="Billing Plans"
                style={{width: "100%", height: "100%", border: 0}}
                allow="payment *; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
        </div>
    )
}

export default Plans;