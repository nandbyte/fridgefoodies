import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useHistory, useLocation } from "react-router-dom";

export interface TabObject {
    tabName: string;
    tabPanel: React.ReactElement;
    tabLink: string;
}

const TabView = (props: any) => {
    const tabList: Array<TabObject> = props.tabList;
    const location = useLocation();
    const history = useHistory();

    const [currentTab, setCurrentTab] = useState<number>(0);

    useEffect(() => {
        refreshTabIndex();
    }, [location]); //eslint-disable-line

    const refreshTabIndex = (): void => {
        for (let i = 0; i < tabList.length; i++) {
            if (tabList[i].tabLink === location.pathname) {
                setCurrentTab(i);
            }
        }
    };

    const handleTabChange = (index: number) => {
        history.push(tabList[index].tabLink);
    };

    return (
        <Tabs
            index={currentTab}
            onChange={(index) => handleTabChange(index)}
            colorScheme="orange"
            variant="solid-rounded"
            isLazy
        >
            <TabList>
                <SimpleGrid w="100%" gap={6} columns={2}>
                    {tabList.map((tabs) => (
                        <Tab
                            key={tabs.tabName}
                            color="orange.700"
                            background="orange.100"
                            fontWeight="bold"
                            fontSize={{ base: "lg" }}
                            _hover={{
                                backgroundColor: "orange.200",
                            }}
                        >
                            {tabs.tabName}
                        </Tab>
                    ))}
                </SimpleGrid>
            </TabList>

            <TabPanels>
                {tabList.map((tabs) => (
                    <TabPanel key={tabs.tabName} p={0} pt={6}>
                        {tabs.tabPanel}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export default TabView;
