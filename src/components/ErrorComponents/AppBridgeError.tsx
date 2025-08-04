import {FC} from "react";
import {Button} from "@shopify/polaris";

const AppBridgeError: FC<{appBridgeError: string}> = ({appBridgeError}) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center'
    }}>
        <div>
            <div style={{ marginBottom: '20px', color: '#d82c0d' }}>
                <h3>App Bridge Error</h3>
                <p>{appBridgeError}</p>
            </div>
            <Button
                onClick={() => window.location.reload()}
                variant="primary"
            >
                Retry
            </Button>
        </div>
    </div>
)

export default AppBridgeError;