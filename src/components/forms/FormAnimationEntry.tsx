import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import {useSiteState} from "@context/sites/SiteContext";
import { ISite } from '@interfaces/site';
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationEntry, IAnimationConnection } from 'variojs/lib/types-interfaces';
import FormInputString from '@components/form-elements/FormInputText';
import FormLabel from '@components/form-elements/FormLabel';
import {usePlaceholders} from "@context/placeholders/PlaceholdersContext";
import Button from '@components/Button';
import FormHeading from '@components/form-elements/FormHeading';
import {getAnimationDefinitionById, IAnimationDefinition, calculateSumString} from 'variojs';
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";
import FormFieldset from '@components/form-elements/FormFieldset';

interface IProps {
    animationEntry: IAnimationEntry
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const FormAnimationEntry = ({animationEntry}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const placeholders = usePlaceholders();
    const {animationData} = useAnimationDataState();

    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const numbers = (activeSite && activeSite.numbers)?activeSite.numbers:{};
    const animationDataNumbers = (animationData && animationData.numbers)?animationData.numbers:{};

    const refSelectDomReference = React.createRef<HTMLSelectElement>();
    const navigationDispatch = useNavigationDispatch();
    
    useEffect(() => {
        if(refSelectDomReference.current) {
            refSelectDomReference.current.value = animationEntry.domReference;
        }
    }, [animationEntry]);

    const placeConnectAnimation = useCallback(() => {
        if(!animationData || !animationData.animationDefinitions) {
            return
        }
        return (
            <div style={{marginBottom: '14px'}}>
                <select onChange={
                    (event:any) => {
                        animationDataDispatch({
                            type: AnimationDataActions.addAnimationEntryConnection,
                            animationConnection: {
                                animationDefinitionId: event.target.value
                            },
                            animationEntryId: animationEntry.id,
                            local: false
                        });
                    }
                }>
                    <option selected disabled>Connect animation definition</option>
                    {
                        animationData.animationDefinitions.reduce((result: React.ReactNode[], animationDefinition: IAnimationDefinition) => {
                            if(animationDefinition.name) {
                            result.push(
                                <option key={animationDefinition.id} value={animationDefinition.id}>{animationDefinition.name}</option>
                            );
                            }
                            return result;
                        }, [])
                        
                    }
                </select><br/>
            </div>
        )
    }, [animationData, animationEntry]);
    const placeAnimation = useCallback((animationConnection:IAnimationConnection, animationDefinition:IAnimationDefinition) => {
        let title = (animationDefinition && animationDefinition.name)? animationDefinition.name: (animationDefinition && animationDefinition.id)? animationDefinition.id : '';
       return (
        <BlockLine key={animationConnection.animationDefinitionId}>
        <Button onClick={() => {
            if(!animationDefinition) {
                return;
            }
            animationDataDispatch({
                type: AnimationDataActions.setActiveAnimationEntry,
                activeAnimationEntry: {
                    id: animationEntry.id
                },
            });
            animationDataDispatch({
                type: AnimationDataActions.setActiveAnimationDefinition,
                animationDefinitionId: animationDefinition.id
            });
            animationDataDispatch({
                type: AnimationDataActions.setFilterByFrameId,
                frameId: undefined
            })
            navigationDispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.ANIMATION_DEFINITION,
            });
        }}>
            {title}
        </Button>
        <>
            <RemoveButtonHolder>
                <Button onClick={() => {
                    if(!animationDefinition) {
                        return;
                    }
                    animationDataDispatch({
                        type: AnimationDataActions.deleteAnimationEntryConnection,
                        animationDefinitionId: animationDefinition.id,
                        animationEntryId: animationEntry.id,
                        local: false
                    });
                }}><DeleteLabel>Disconnect</DeleteLabel></Button>
            </RemoveButtonHolder>

            <br />
            <FormInputString 
                subLabel={(animationConnection.startPx)?''+calculateSumString(animationConnection.startPx, numbers, animationDataNumbers):''}
                defaultValue={animationConnection.startPx} label="Starting point px" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.editAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        animationConnection: {
                            ...animationConnection,
                            startPx: event.target.value
                        },
                        local: false
                    }
                );
            }} />
            <FormInputString 
                subLabel={(animationConnection.startMs)?''+calculateSumString(animationConnection.startMs, numbers, animationDataNumbers):''}
                defaultValue={animationConnection.startMs} label="Starting point ms" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.editAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        animationConnection: {
                            ...animationConnection,
                            startMs: event.target.value
                        },
                        local: false
                    }
                );
            }} />
        </>
        
    </BlockLine>
       )
    }, [animationData, animationEntry])
    const placeAnimations = useCallback(() => {
        const animationConnections = animationEntry.animationConnections;
        if(!animationConnections){
            return;
        }
        return animationConnections.map((animationConnection: IAnimationConnection) => {
            
            const animationDefinition = getAnimationDefinitionById(animationData, animationConnection.animationDefinitionId);

            if(!animationDefinition) {
                return
            }
            return placeAnimation(animationConnection, animationDefinition);
        })
    }, [animationData, animationEntry]);
    return (
        <div>
            <FormHeading subHeading={`${animationEntry.name} - ${animationEntry.domReference}`} className="large">Animation entry</FormHeading>
            <FormFieldset>
                <FormInputString label="Name" defaultValue={(animationEntry.name)?animationEntry.name:animationEntry.id} onChange={(event: any) => {
                                animationDataDispatch(
                                    {
                                        type: AnimationDataActions.editAnimationEntry,
                                        animationEntry: {
                                            ...animationEntry,
                                            name: event.target.value
                                        }
                                    }
                                );
                    }} />
            </FormFieldset>
            {
                (animationEntry.animationConnection)?
                <>
                <FormFieldset>
                    <FormInputString label="Starting point px" defaultValue={animationEntry.animationConnection.startPx} onChange={(event: any) => {
                                    animationDataDispatch(
                                        {
                                            type: AnimationDataActions.editAnimationEntry,
                                            animationEntry: {
                                                ...animationEntry,
                                                animationConnection: {
                                                    ...animationEntry.animationConnection,
                                                    startPx: event.target.value
                                                }
                                                
                                            }
                                        }
                                    );
                        }} />
                </FormFieldset>
                <FormFieldset>
                    <FormInputString label="Starting point ms" defaultValue={animationEntry.animationConnection.startMs} onChange={(event: any) => {
                                    animationDataDispatch(
                                        {
                                            type: AnimationDataActions.editAnimationEntry,
                                            animationEntry: {
                                                ...animationEntry,
                                                animationConnection: {
                                                    ...animationEntry.animationConnection,
                                                    startMs: event.target.value
                                                }
                                            }
                                        }
                                    );
                        }} />
                </FormFieldset>
                </>:null
            }
            
            <FormFieldset>
                    <FormLabel className="small">Dom reference</FormLabel><br />
                    <select ref={refSelectDomReference} defaultValue={animationEntry.domReference} onChange={(event:any) => {
                        animationDataDispatch(
                            {
                                type: AnimationDataActions.editAnimationEntry,
                                animationEntry: {
                                    ...animationEntry,
                                    domReference: event.target.value
                                }
                            }
                        );
                    }}>
                        {
                            placeholders.reduce((result: React.ReactNode[], id:string, index: number) => {
                                if(animationData && animationData.animationEntries && animationData.animationEntries.find((animationEntry: IAnimationEntry) => (animationEntry.id ===  id))) {
                                    return result
                                } else {
                                    result.push(<option key={`${id}${index}`} value={id || ''}>{id}</option>);
                                }
                                return result;
                            }, [])
                        }
                    </select>
            </FormFieldset>
            <FormFieldset>
                <FormLabel>Connected animation definitions</FormLabel><br/>
                {
                    placeConnectAnimation()
                }
                {
                    placeAnimations()
                }
            </FormFieldset>

                
                

        </div>
    )
}
export default FormAnimationEntry;