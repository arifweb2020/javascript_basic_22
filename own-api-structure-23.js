import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from 'store';
import { List } from 'immutable';

import { SearchBar, CollapsibleContent } from 'orion-rwc';

import { getIntlMessage } from 'utils/Translate';

import * as PropTypes from 'utils/PropTypes';

import ExpandIcon from 'assets/svg/actn-caret-dwn-lg.svg';
import CollapseIcon from 'assets/svg/actn-caret-up-lg.svg';
import ComputerCircleIcon from 'assets/svg/computer-circle.svg';

import LeftPanelFilter from 'components/left-panel-filter/LeftPanelFilter';
import renderIcon from 'components/icon/Icon';
import CollapsibleSection, { collapsibleSectionStyles } from 'components/collapsible-section/CollapsibleSection';

import ProfileTemplates from 'domain/profile-templates/enums/ProfileTemplateTypes';

import styles from './styles/workflow-leftpanel-tabs.scss';
import LeftPanelTabType from './enums/LeftPanelTabTypes';
import LeftPanelCollapsibleCategories from './LeftPanelCollapsibleCategories';
import { DraggableItem } from '../../components/drag-and-drop/DragAndDropUtil';
import RenderItem from './LeftPanelItems';
import * as LeftPanelActions from './actions/LeftPanelActions';

const computerIcon = renderIcon(ComputerCircleIcon, styles.computerCircleIcon);

export interface LeftPanelState {
    collapsedGroupNames: string[];
    groups: string[];
}

interface SubCategory {
    id: number;
    title: string;
}

interface Category {
    id: number;
    title: string;
    subCategory?: List<SubCategory>;
}

interface ProfileData {
    id: number;
    title: string;
    category: List<Category>;
}

enum FilterPanelHeadingType {
    FILTER_BY_CREATOR = 'Filter by Creator',
    FILTER_BY_TEST_TYPE = 'Filter by Test Type',
    FILTER_BY_ACTION_TYPE = 'Filter by Action Type',
    FILTER_BY_ACTION = 'Filter by Action',
}

const Test: React.FC<{
    activeLeftPanelTab?: LeftPanelTabType;
    collapsedGroupNames?: string[];
    groups?: List<string>;
    onToggleGroup?: PropTypes.AnyFunc;
    onCollapseAll?: PropTypes.AnyFunc;
    onExpandAll?: PropTypes.Func;
    onToggle?: () => void;
    handleToggle?: (groupName: any) => void;
}> = memo(props => {

    const { activeLeftPanelTab } = props;

    const [searchString, setSearchString] = useState('');

    const dispatch = useDispatch();

    const searchRegex = new RegExp(searchString, 'i');
    const profileGroups = useSelector((state: ApplicationState) => state.profiles)
        .profiles
        .filter(h => {
            return h.get('profileTemplateId') !== ProfileTemplates.VIM &&
                h.get('profileTemplateId') !== ProfileTemplates.IMIX &&
                h.get('profileTemplateId') !== ProfileTemplates.MANO &&
                h.get('name').search(searchRegex) !== -1;
        })
        .sortBy(f => f.get('profileTemplateId'))
        .groupBy(item => item.get('profileTemplateId'));

    const selectItmesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("select items " , e.target.value)
    };

    const renderLeftPanelProfileItems = (profileItems, dragType) => {
        return (
            <div className={styles.leftPanelGroupItem}>
                {profileItems.map(item => DraggableItem(item, dragType, RenderItem))}
            </div>
        );
    };

    // FIXME: Add filter groups and items
    // const filterGroups: List<FilterGroupModel> = List.of();

    const renderSearchBar = tabId => {

        const profileData = profileGroups.toJS();

        const rawData = {
            "environment": [
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "env1",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                },
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "env2",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                },
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "env3",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                }
            ],
            "load_generator": [
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "lg1",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                },
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "lg2",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                }
            ],
            "sctest": [
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "Pod Delete with Latency",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                    "testType": "CNF Resiliency",
                    "actionType": ["Failure State", "LG"]
                },
                {
                    "id": "e3153d72b6834a5f9ca8cc95ae1e47ee",
                    "name": "Scaling Pod delete",
                    "createdBy": "7c59b574d649446f93afde602e65fccc",
                    "testType": "CNF Scaliblity",
                    "actionType": ["Network Controller", "Resource Contention"]

                }
            ]
        }

        //     {
        //         id: 1,
        //         title: 'Environments',
        //         category: List.of(
        //             {
        //                 id: 10,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id: 11,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id: 12,
        //                         title: 'Sara Wight',
        //                     },
        //                     {
        //                         id: 13,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },
        //         )
        //     },

        //     {
        //         id:2,
        //         title: 'LGs',
        //         category: List.of(
        //             {
        //                 id:20,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id:21,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id:22,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },
        //         )
        //     },

        //     {
        //         id:3,
        //         title: 'sctests',
        //         category: List.of(
        //             {
        //                 id:30,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id:31,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id:32,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },

        //             {
        //                 id:301,
        //                 title: 'Filter by Test Type',
        //                 subCategory: List.of(
        //                     {
        //                         id:3001,
        //                         title: 'CNF Resiliency',
        //                     },
        //                     {
        //                         id:3002,
        //                         title: 'CNF Scalability',
        //                     }
        //                 )
        //             },

        //             {
        //                 id:302,
        //                 title: 'Filter by Action Type',
        //                 subCategory: List.of(
        //                     {
        //                         id:3021,
        //                         title: 'Failure State',
        //                     },
        //                     {
        //                         id:3022,
        //                         title: 'LG',
        //                     },
        //                     {
        //                         id:3024,
        //                         title: 'Network Controller',
        //                     },
        //                     {
        //                         id:3025,
        //                         title: 'Resource Contention',
        //                     }
        //                 )
        //             },
        //         )
        //     },
        // );
        const actionData = {
            'impairment': [
                {
                    createdBy: '7c59b574d649446f93afde602e65fccc',
                    createdAt: '2021-02-16T12:04:23Z',
                    id: 'e3153d72b6834a5f9ca8cc95ae1e79ee',
                    actionType: ['Failure State', 'Network Controller', 'Resource Contention'],
                },
            ]
        }

        const templateData = {
            'resiliency': [
                {
                    createdBy: '7c59b574d649446f93afde602e65fccc',
                    createdAt: '2021-02-16T12:04:23Z',
                    id: 'e3153d72b6834a5f9ca8cc95ae1e79ee',
                    actionType: ['Failure State', 'LG'],
                    action: ['Container Kill', 'Continue Landslide', 'Network Latency', 'Node Drain', 'Node Reboot', 'Continue Landslide', 'Node Resource Contention', 'Node Taint'],
                },
                {
                    createdBy: '7c59b574d649446f93afde602e65fccc',
                    createdAt: '2021-02-16T12:04:23Z',
                    id: 'e3153d72b6834a5f9ca8cc95ae1e79ee',
                    actionType: ['Network Controller', 'Resource Contention'],
                    action: ['Packet Loss', 'Pod CPU Hog', 'Pod Delete', 'Pod Disk Full', 'Pod Memory Hog', 'Start Landslide', 'Stop Landslide'],
                },
            ]
        }


        const activeTabData = tabId === getIntlMessage('workflowEditorPage.PROFILES') ? rawData :
            tabId === getIntlMessage('workflowEditorPage.ACTIONS') ? actionData :
                templateData;


        const data: List<ProfileData> | any = [];
        let id = 1;

        for (const categoryKey in activeTabData) {
            if (categoryKey in activeTabData) {
                const categoryList = activeTabData[categoryKey];
                const title = categoryKey.replace('_', ' ').replace(/\b\w/g, match => match.toUpperCase());
                const filtercreatedBy = tabId === getIntlMessage('workflowEditorPage.PROFILES');
                const createdBy = filtercreatedBy ? categoryList.filter(item => item.createdBy).map(item => item.createdBy) : [];

                const subCategories: List<SubCategory> = categoryList.map(item => ({
                    id: id++,
                    title: item.name,
                }));

                const category: List<Category> | any = createdBy.length > 0 ? [{
                    id: id++,
                    title: FilterPanelHeadingType.FILTER_BY_CREATOR,
                    subCategory: subCategories,
                }] : [];

                const testTypeSubCategories = categoryList
                    .filter(item => item.testType)
                    .map(item => ({
                        id: id++,
                        title: item.testType,
                    }));

                const actionTypeSubCategories = categoryList
                    .filter(item => item.actionType)
                    .flatMap(item => item.actionType.map(actionItem => ({
                        id: id++,
                        title: actionItem,
                    })));

                const actionSubCategories = categoryList
                    .filter(item => item.action)
                    .flatMap(item => item.action.map(actionItem => ({
                        id: id++,
                        title: actionItem,
                    })));

                console.log("actionSubCategories", actionSubCategories)

                testTypeSubCategories.length > 0 && category.push({
                    id: id++,
                    title: FilterPanelHeadingType.FILTER_BY_TEST_TYPE,
                    subCategory: testTypeSubCategories,
                });

                actionTypeSubCategories.length > 0 && category.push({
                    id: id++,
                    title: FilterPanelHeadingType.FILTER_BY_ACTION_TYPE,
                    subCategory: actionTypeSubCategories,
                });

                actionSubCategories.length > 0 && category.push({
                    id: id++,
                    title: FilterPanelHeadingType.FILTER_BY_ACTION,
                    subCategory: actionSubCategories,
                });

                data.push({
                    id: id++,
                    title,
                    category
                });
            }
        }

        console.log("profilesData", data);



        return (
            <>
                <div className={styles.searchBarWrapper}>
                    <SearchBar placeholder={`${getIntlMessage('workflowEditorPage.SEARCH')} ${tabId}`}
                        value={searchString || ''}
                        isClearIcon={true}
                        onValueChanged={setSearchString}
                        isInputRounded={true}
                        className={styles.leftPanelSearchBar} />
                    <LeftPanelFilter data={data} selectItmesHandler={selectItmesHandler} />
                </div>
            </>
        );
    };

    // Fixme: Mocked leftpanel groups

    const actionsGroup = List.of(
        {
            id: 'impairments',
            title: 'Impairments',
            count: 2,
            items: List.of('Network Latency', 'Noad Loading')
        },
        {
            id: 'landslide',
            title: 'Landslide',
            count: 2,
            items: List.of('Start Landslide', 'Stop Landslide')
        }
    );

    const templatesGroup = List.of(
        {
            id: 'spirentDefined',
            title: 'Spirent defined',
            count: 2,
            items: List.of('Infrastructure A', 'Scalability')
        },
        {
            id: 'userDefined',
            title: 'User defined',
            count: 2,
            items: List.of('NRF full test', 'Template 2')
        }
    );

    const renderLeftPanelGroupItems = (items: List<string>) => {
        return (
            <div className={styles.leftPanelGroupItem}>
                {items.map(item => {
                    return (
                        <div key={item} className={styles.groupItem}>
                            <div className={styles.groupItemIcon}>{computerIcon}</div>
                            <div>{item}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const collapsedGroupNames = useSelector((state: ApplicationState) => state.workflowLeftPanel).collapsedGroupNames;
    const profilesList = Object.keys(profileGroups).map(profile => profile);

    const areAllGroupsCollapsed = () => {
        return collapsedGroupNames.length === profilesList.length;
    };

    const onExpandAll = () => dispatch(LeftPanelActions.leftPanelAllExpanded());

    const onCollapseAll = groupNames =>
        dispatch(LeftPanelActions.leftPanelAllCollapsed(groupNames));

    const onToggleGroup = (groupName: string) => dispatch(LeftPanelActions.leftPanelGroupToggled(groupName));

    const handleToggleAll = () => {
        if (areAllGroupsCollapsed()) {
            onExpandAll();
        } else {
            onCollapseAll(Object.keys(profileGroups).map(profile => profile));
        }
    };

    const expandIcon = renderIcon(ExpandIcon, styles.directionIcon);
    const collapseIcon = renderIcon(CollapseIcon, styles.directionIcon);

    const ExpandAllHeader = () => {

        const directionIcon = areAllGroupsCollapsed() ? expandIcon : collapseIcon;

        return (
            <div className={styles.root}>
                <div className={styles.leftPart}>
                    {areAllGroupsCollapsed()
                        ? getIntlMessage('leftPanel.expandAll')
                        : getIntlMessage('leftPanel.collapseAll')}
                </div>
                <div className={styles.rightPart}>
                    {directionIcon}
                </div>
            </div>
        );
    };

    const groupHeader = (title, count) => {
        return (
            <div className={styles.itemHeader}>
                {`${title} (${count})`}
            </div>
        );
    };

    const createLeftPanelTabContent = activeLeftPanelTabItem => {
        switch (activeLeftPanelTabItem) {
            case LeftPanelTabType.PROFILES:
                return (
                    <>
                        <div className={styles.dropdownWrapper}>
                            {renderSearchBar('Profiles')}
                        </div>
                        <CollapsibleSection className={collapsibleSectionStyles.mRootWithoutTopBorder}
                            headerRender={ExpandAllHeader}
                            onToggle={handleToggleAll}
                        />
                        {
                            profileGroups.entrySeq().map(profile => {
                                return <CollapsibleContent
                                    key={profile[0]} header={groupHeader(profile[0].replace('_', ' '), profile[1].count())}
                                    onToggle={() => onToggleGroup(profile[0])}
                                    isCollapsed={Array.from(collapsedGroupNames).includes(profile[0])}>
                                    {renderLeftPanelProfileItems(profile[1], profile[0])}
                                </CollapsibleContent>;
                            })
                        }
                    </>
                );

            case LeftPanelTabType.ACTIONS:
                return (
                    <>
                        <div className={styles.dropdownWrapper}>
                            {renderSearchBar('Actions')}
                        </div>
                        <CollapsibleSection className={collapsibleSectionStyles.mRootWithoutTopBorder} // FIXME: Expand All functionality
                            headerRender={ExpandAllHeader}
                            headerLeft={getIntlMessage('leftPanel.expandAll')} />
                        {
                            actionsGroup.map(group => {

                                return <div key={group.id}>
                                    <LeftPanelCollapsibleCategories title={`${group.title} (${group.count})`}>
                                        {renderLeftPanelGroupItems(group.items)}
                                    </LeftPanelCollapsibleCategories>
                                </div>;
                            })
                        }
                    </>
                );

            case LeftPanelTabType.TEMPLATES:
                return (
                    <>
                        <div className={styles.dropdownWrapper}>
                            {renderSearchBar('Templates')}
                        </div>
                        <CollapsibleSection className={collapsibleSectionStyles.mRootWithoutTopBorder} // FIXME: Expand All functionality
                            headerRender={ExpandAllHeader}
                            headerLeft={getIntlMessage('leftPanel.expandAll')} />
                        {
                            templatesGroup.map(group => {

                                return <div key={group.id}>
                                    <LeftPanelCollapsibleCategories title={`${group.title} (${group.count})`}>
                                        {renderLeftPanelGroupItems(group.items)}
                                    </LeftPanelCollapsibleCategories>
                                </div>;
                            })
                        }
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {createLeftPanelTabContent(activeLeftPanelTab)}
        </>
    );
});

export default Test;



// const data1 = List.of(
        //     {
        //         id: 1,
        //         title: 'Environments',
        //         category: List.of(
        //             {
        //                 id: 10,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id: 11,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id: 12,
        //                         title: 'Sara Wight',
        //                     },
        //                     {
        //                         id: 13,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },
        //         )
        //     },

        //     {
        //         id:2,
        //         title: 'LGs',
        //         category: List.of(
        //             {
        //                 id:20,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id:21,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id:22,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },
        //         )
        //     },

        //     {
        //         id:3,
        //         title: 'sctests',
        //         category: List.of(
        //             {
        //                 id:30,
        //                 title: 'Filter by Creator',
        //                 subCategory: List.of(
        //                     {
        //                         id:31,
        //                         title: 'John Smith',
        //                     },
        //                     {
        //                         id:32,
        //                         title: 'Spirent',
        //                     }
        //                 )
        //             },

        //             {
        //                 id:301,
        //                 title: 'Filter by Test Type',
        //                 subCategory: List.of(
        //                     {
        //                         id:3001,
        //                         title: 'CNF Resiliency',
        //                     },
        //                     {
        //                         id:3002,
        //                         title: 'CNF Scalability',
        //                     }
        //                 )
        //             },

        //             {
        //                 id:302,
        //                 title: 'Filter by Action Type',
        //                 subCategory: List.of(
        //                     {
        //                         id:3021,
        //                         title: 'Failure State',
        //                     },
        //                     {
        //                         id:3022,
        //                         title: 'LG',
        //                     },
        //                     {
        //                         id:3024,
        //                         title: 'Network Controller',
        //                     },
        //                     {
        //                         id:3025,
        //                         title: 'Resource Contention',
        //                     }
        //                 )
        //             },
        //         )
        //     },
        // );

