import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@vkontakte/vkui/dist/vkui.css";
import {
    AdaptivityProvider,
    ConfigProvider,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import './index.css';

window.addEventListener("load", () => {
    bridge.send('VKWebAppInit').catch(console.error);

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <ConfigProvider>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>,
    );
});

reportWebVitals();
