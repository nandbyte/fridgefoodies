import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";

export interface TabObject {
    tabName: string;
    tabPanel: React.ReactElement;
}

const TabView = (props: any) => {
    const tabList: Array<TabObject> = props.tabList;

    return (
        <Tabs isLazy>
            <TabList>
                {tabList.map((tabs) => (
                    <Tab fontWeight="semibold">{tabs.tabName}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {tabList.map((tabs) => (
                    <TabPanel>{tabs.tabPanel}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};

export default TabView;
