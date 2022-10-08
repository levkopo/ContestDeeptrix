import React, {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';
import {
  AppRoot,
  Epic,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  useAdaptivity,
  ViewWidth,
  Cell
} from "@vkontakte/vkui";
import {Icon28HomeOutline} from '@vkontakte/icons';
import Icon28PetOutline from "./icons/Icon28PetOutline";
import Icon28ShopOutline from "./icons/Icon28ShopOutline";
import ShopPanel from "./stories/ShopPanel";
import './App.css';

const navigationItems = [
  {
    id: "home",
    name: "Главная",
    icon: <Icon28HomeOutline/>,
  },
  {
    id: "pets",
    name: "Питомцы",
    icon: <Icon28PetOutline/>
  },
  {
    id: "shop",
    name: "Магазин",
    icon: <Icon28ShopOutline/>
  }
]

const balanceContext = createContext<[number, Dispatch<SetStateAction<number>>]>([2500, () => {}])
export const useBalance = () => useContext(balanceContext)
export const useSpendMoney = () => {
  const [balance, setBalance] = useBalance()
  return (price: number) => new Promise((resolve, reject) => {
      if(balance<price) {
          return reject()
      }

      // Тут можно сделать связь с бекендом
      setBalance(balance-price)
      return resolve(undefined)
  })
}

function App() {
  const { viewWidth } = useAdaptivity();
  const [activeStory, setActiveStory] = useState<string>("shop")
  const currentBalanceState = useState<number>(25000)

  return (
      <balanceContext.Provider value={currentBalanceState}>
        <AppRoot>
          <SplitLayout
              header={<PanelHeader separator={false} />}
              style={{ justifyContent: "center" }}
          >
            {viewWidth >= ViewWidth.TABLET &&
                <SplitCol fixed width={280} maxWidth={280}>
                  <Panel>
                    <PanelHeader/>
                    <Group>
                      {
                        navigationItems.map(it =>
                            <Cell
                                disabled={activeStory===it.id}
                                style={
                                  activeStory === it.id
                                      ? {
                                        backgroundColor:
                                            "var(--vkui--color_background_secondary)",
                                        borderRadius: 8,
                                      }
                                      : {}
                                }
                                before={it.icon}
                                onClick={() => setActiveStory(it.id)}
                            >{it.name}</Cell>
                        )
                      }
                    </Group>
                  </Panel>
                </SplitCol>
            }

            <SplitCol
                animate={!(viewWidth >= ViewWidth.TABLET)}
                spaced={viewWidth >= ViewWidth.TABLET}
                width={viewWidth >= ViewWidth.TABLET ? 560: "100%"}
                maxWidth={viewWidth >= ViewWidth.TABLET ? 560: "100%"}
            >
              <Epic activeStory={activeStory} tabbar={
                  viewWidth <= ViewWidth.SMALL_TABLET && <Tabbar>
                    {navigationItems.map(it => <TabbarItem
                        key={it.id}
                        selected={activeStory===it.id}
                        onClick={() => setActiveStory(it.id)}
                    >{it.icon}</TabbarItem>)}
                  </Tabbar>
              }>
                <Panel id="home">
                  <PanelHeader>Домашняя страница</PanelHeader>
                </Panel>
                <ShopPanel id="shop"/>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </balanceContext.Provider>
  );
}

export default App;
