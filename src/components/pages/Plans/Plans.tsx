import {FC} from "react";
import {useGetPlansLink} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const Plans: FC = () => {
    const name = useGetShopName()
    const { data } = useGetPlansLink(name || 'wand-test-store');
    if(!data?.data){
        return (
            <div className="h-[100vh] w-full p-4 flex flex-col justify-center items-center">
                <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
        );
    }
    return (
        <div style={{height: "100vh"}}>
            <iframe
                id="myIframeId"
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
