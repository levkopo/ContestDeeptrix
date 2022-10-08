import React, {useState} from "react";
import {
    Panel,
    PanelProps,
    PanelHeader,
    CardGrid,
    Card,
    Title,
    SubnavigationBar,
    SubnavigationButton,
    Group,
    Header,
    Tappable, Snackbar,
} from "@vkontakte/vkui";
import BalanceCounter from "../components/BalanceCounter";
import { Icon24Done, Icon24Coins, Icon20CheckCircleFillGreen, Icon20CancelCircleFillRed } from '@vkontakte/icons';
import {useSpendMoney} from "../App";
import "./ShopPanel.css";

const baseItems = [
    {
        icon: "./resources/kepka.png",
        title: "Кепка модника",
        price: 300
    },
    {
        icon: "./resources/koltso_udachi.png",
        title: "Колесо удачи",
        price: 500
    },
    {
        icon: "./resources/tolstovka.png",
        title: "Толстовка умника",
        price: 500
    },
    {
        icon: "./resources/robin_gud.png",
        title: "Шапка счастья",
        price: 500
    },
    {
        icon: "./resources/solomennaya_shlyapa.png",
        title: "Шляпа фермера",
        price: 500
    },
    {
        icon: "./resources/ochki_umnika.png",
        title: "Очки уминка",
        price: 500
    },
]

const tabs = [
    {
        id: "clothes",
        title: "Одежда",
        items: [React]
    },
    {
        id: "food",
        title: "Еда"
    },
    {
        id: "boosters",
        title: "Бустеры"
    },
    {
        id: "currency",
        title: "Валюта"
    }
]

export default function ShopPanel(props: PanelProps) {
    const [selectedTab, setSelectedTab] = useState<number>(0)
    const [snackbar, setSnackbar] = React.useState<JSX.Element|null>(null);

    const spendMoney = useSpendMoney()

    return <Panel {...props}>
        <PanelHeader separator={false} before={<BalanceCounter/>}>Магазин</PanelHeader>
        <CardGrid size="l">
            <Card className="BannerCard" style={{
                background: "url(./resources/header-image.png) no-repeat center",
                backgroundSize: "cover",
            }}>
                <div className="BannerCard-Title">Встрейчайте Хеллоуин!</div>
            </Card>
        </CardGrid>

        <SubnavigationBar>
            {
                tabs.map((it, id) => <SubnavigationButton
                    key={id}
                    selected={selectedTab===id}
                    onClick={() => setSelectedTab(id)}
                >
                    {it.title}
                </SubnavigationButton>)
            }
        </SubnavigationBar>

        <Group header={<Header>{tabs[selectedTab].title}</Header>}>
            {/*TODO: перенести стили в файл и разделить на компоненты*/}
            <div className="ShopPanel-Items">
                {baseItems.map((it, i) =>
                    <Tappable activeMode="background" key={i} onClick={() => {
                        setSnackbar(null)
                        spendMoney(it.price).then(() => {
                            setSnackbar(
                                <Snackbar
                                    layout="vertical"
                                    before={
                                        <Icon20CheckCircleFillGreen/>
                                    }
                                    onClose={() => setSnackbar(null)}>
                                    Вы успешно приобрели {it.title}
                                </Snackbar>
                            );
                        }).catch(() => {
                            setSnackbar(
                                <Snackbar
                                    layout="vertical"
                                    before={
                                        <Icon20CancelCircleFillRed/>
                                    }
                                    onClose={() => setSnackbar(null)}>
                                    Недостаточно средств
                                </Snackbar>
                            );
                        })
                    }}>
                        <div className="ShopPanel-Item">
                            <Card
                                mode="outline"
                                className="ShopPanel-Item-Icon"
                            >
                                <img src={it.icon} alt={it.title}/>
                            </Card>

                            <div className="ShopPanel-Item-Title">{it.title}</div>

                            <div className="ShopPanel-Item-Subtitle">
                                <Icon24Coins className="ShopPanel-Item-Subtitle-Icon"/>
                                <div className="ShopPanel-Item-Subtitle-Text">{it.price}</div>
                            </div>
                        </div>
                    </Tappable>
                )}
            </div>
        </Group>

        {snackbar}
    </Panel>
}