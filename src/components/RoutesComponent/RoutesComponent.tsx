import {FC, ReactNode, useEffect, useState} from "react";
import CustomizationPage from "src/components/pages/CustomizationPage";
import Plans from "src/components/pages/Plans/Plans";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "src/components/pages/dashboard";
import AgentConfigPage from "src/components/pages/agent-config";
import ConversationPage from "src/components/pages/conversation";
import TestingPage from "src/components/pages/testing";
import {Spinner} from "@shopify/polaris";
import {useShowPlansManager} from "src/providers/ShopifyProvider";

const RoutesComponent: FC = () => {
    const [root, setRoot] = useState<ReactNode>(<Route path="/" element={<div className="w-full h-[100vh] flex justify-center items-center"><Spinner accessibilityLabel="Spinner example" size="large" /></div>} />);
    const {show_plans, isLoading, plans_refetch} = useShowPlansManager();
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
    useEffect(() => {
        if(show_plans){
            setRoot(<Route path="/" element={<DashboardPage />} />)
        } else {
            setRoot(<Route path="/" element={<Plans />} />)
        }
    }, [show_plans]);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const chargeId = params.get("charge_id");
        if(chargeId){
            setShouldRefetch(true);
        } else {
            setShouldRefetch(false);
        }
    }, []);
    useEffect(() => {
        let intervalId: NodeJS.Timer
        if(shouldRefetch){
            intervalId = setInterval(() => {
                const params = new URLSearchParams(window.location.search);
                const chargeId = params.get("charge_id");
                if(chargeId){
                    setShouldRefetch(true);
                    plans_refetch();
                } else {
                    setShouldRefetch(false);
                }
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [shouldRefetch]);
    if(isLoading || shouldRefetch){
        return(
            <div className="w-full h-[100vh] flex justify-center items-center">
                <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
        )
    }
    return (
        <Routes>
            {root}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/config" element={<AgentConfigPage />} />
            <Route path="/conversation" element={<ConversationPage />} />
            <Route path="/test" element={<TestingPage />} />
            <Route path="/customization" element={<CustomizationPage />} />
            <Route path="/plans" element={<Plans />} />
        </Routes>
    )
}

export default RoutesComponent;