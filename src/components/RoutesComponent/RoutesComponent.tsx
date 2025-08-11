import {FC, ReactNode, useEffect, useState} from "react";
import CustomizationPage from "src/components/pages/CustomizationPage";
import Plans from "src/components/pages/Plans/Plans";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "src/components/pages/dashboard";
import AgentConfigPage from "src/components/pages/agent-config";
import ConversationPage from "src/components/pages/conversation";
import TestingPage from "src/components/pages/testing";
import {useShowPlans} from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import {Spinner} from "@shopify/polaris";

const RoutesComponent: FC = () => {
    const name = useGetShopName()
    const { data } = useShowPlans(name || 'wand-test-store');
    const [root, setRoot] = useState<ReactNode>(<Route path="/" element={<Spinner accessibilityLabel="Spinner example" size="large" />} />)
    useEffect(() => {
        if(data?.data){
            if(data.data.subscription_active){
                setRoot(<Route path="/" element={<DashboardPage />} />)
            } else {
                setRoot(<Route path="/" element={<Plans />} />)
            }
        }
    }, [data?.data]);
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