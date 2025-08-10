import {FC} from "react";

const Plans: FC = () => {
    return (
        <div style={{height: "100vh"}}>
            <iframe
                src="https://billing.heymantle.com/s/plans?id=413f4100-5e12-4b44-8882-1a0845b138c5&locale=&appClientId=bb11532520e1cb0f1f8f31d01e07b1da&shop=wand-test-store.myshopify.com&idToken="
                title="Billing Plans"
                style={{width: "100%", height: "100%", border: 0}}
                allow="payment *; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
        </div>
    )
}

export default Plans;