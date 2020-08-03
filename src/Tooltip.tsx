/**
 * @fileOverview Default Tooltip Content
 */
import React, { PureComponent, CSSProperties, ReactNode, ReactElement, ReactText } from 'react';


interface WordCount {
    word: string,
    count: number
}

interface Item {
    startTime: string;
    startTimeStamp: number;
    displayTime: string;
    count: number,
    map: WordCount[],
}

export type TooltipType = 'none';
export type ValueType = number | string | Array<number | string>;
export type NameType = number | string;
export type Formatter<TValue extends ValueType, TName extends NameType> = (
    value: TValue,
    name: TName,
    item: Payload<TValue, TName>,
    index: number,
    payload: Array<Payload<TValue, TName>>,
) => [ReactNode, ReactNode] | ReactNode;

export interface Payload<TValue extends ValueType, TName extends NameType> {
    type?: TooltipType;
    color?: string;
    formatter?: Formatter<TValue, TName>;
    name?: TName;
    value?: TValue;
    unit?: ReactNode;
    dataKey?: string | number;
    payload: Item,
}

export interface Props<TValue extends ValueType, TName extends NameType> {
    separator?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    formatter?: Function;
    contentStyle?: CSSProperties;
    itemStyle?: CSSProperties;
    labelStyle?: CSSProperties;
    labelFormatter?: (label: any, payload: Array<Payload<TValue, TName>>) => ReactNode;
    label?: any;
    payload?: Array<Payload<TValue, TName>>;
    itemSorter?: (item: Payload<TValue, TName>) => number | string;
}

interface ListProps {
    color?: string,
}
const ListItem: React.FunctionComponent<ListProps> = ({ color, children }) => {
    const finalItemStyle = {
        display: 'block',
        paddingTop: 4,
        paddingBottom: 4,
        color: color || '#000',
    };

    return (
        // eslint-disable-next-line react/no-array-index-key
        <li className="recharts-tooltip-item" style={finalItemStyle}>
            <span className="recharts-tooltip-item-value">{children}</span>
        </li>
    );
}

class DefaultTooltipContent<TValue extends ValueType, TName extends NameType> extends PureComponent<
    Props<TValue, TName>
    > {
    static displayName = 'DefaultTooltipContent';

    static defaultProps = {
        separator: ' : ',
        contentStyle: {},
        itemStyle: {},
        labelStyle: {},
    };

    renderContent() {
        const { payload: data } = this.props;

        if (data && data.length) {
            const listStyle = { padding: 0, margin: 0 };
            const { payload, color } = data[0];

            const topFiveWords = payload.map.slice(0, 5)
            const items = topFiveWords.map(({ word, count }, i) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItem key={`tooltip-item-${i}`} color="#8884d8">
                        {word}: {count}
                    </ListItem>
                );
            });

            return (
                <ul className="recharts-tooltip-item-list" style={listStyle}>
                    {items}
                </ul>
            );
        }

        return null;
    }

    render() {
        const { label } = this.props;
        const finalStyle: CSSProperties = {
            margin: 0,
            padding: 10,
            backgroundColor: 'var(--color-background-alt)',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
            zIndex: 55555,
        };
        const finalLabelStyle = {
            margin: 0,
        };

        let finalLabel = label;
        const payload = this.props.payload && this.props.payload[0];
        if (payload) {
            const { displayTime, count } = payload.payload;
            finalLabel = `${displayTime} – ${count} Messages`;
        }

        return (
            <div className="recharts-default-tooltip" style={finalStyle}>
                <p className="recharts-tooltip-label" style={finalLabelStyle}>
                    {React.isValidElement(finalLabel) ? finalLabel : `${finalLabel}`}
                </p>
                {this.renderContent()}
            </div>
        );
    }
}

export default DefaultTooltipContent;

// @ts-ignore
type UniqueFunc<TValue extends ValueType, TName extends NameType> = (entry: Payload<TValue, TName>) => unknown;

type UniqueOption<TValue extends ValueType, TName extends NameType> = boolean | UniqueFunc<TValue, TName>;

export type TooltipProps<TValue extends ValueType, TName extends NameType> = Props<TValue, TName> & {
    allowEscapeViewBox?: {
        x?: boolean;
        y?: boolean;
    };
    content?: ContentType<TValue, TName>;
    viewBox?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    };
    active?: boolean;
    offset?: number;
    wrapperStyle?: CSSProperties;
    cursor?:
    | boolean
    | ReactElement
    | {
        strokeDasharray: ReactText;
        stroke?: string;
    };
    coordinate?: {
        x?: number;
        y?: number;
    };
    position?: {
        x?: number;
        y?: number;
    };
    trigger?: 'hover' | 'click';
    payloadUniqBy?: UniqueOption<TValue, TName>;
    isAnimationActive?: boolean;
    animationDuration?: number;
    filterNull?: boolean;
    useTranslate3d?: boolean;
};

export type ContentType<TValue extends ValueType, TName extends NameType> =
    | ReactElement
    | ((props: TooltipProps<TValue, TName>) => ReactNode);

export function renderContent<TValue extends ValueType, TName extends NameType>(
    props: TooltipProps<TValue, TName>,
) {

    return (
        <DefaultTooltipContent {...props} />
    );
}



export class Tooltip<TValue extends ValueType, TName extends NameType> extends PureComponent<TooltipProps<TValue, TName>> {
    static displayName = 'Tooltip';

    static defaultProps = {
        active: false,
        allowEscapeViewBox: { x: false, y: false },
        offset: 10,
        viewBox: { x1: 0, x2: 0, y1: 0, y2: 0 },
        coordinate: { x: 0, y: 0 },
        cursorStyle: {},
        separator: ' : ',
        wrapperStyle: {},
        contentStyle: {},
        itemStyle: {},
        labelStyle: {},
        cursor: true,
        trigger: 'hover',
        animationEasing: 'ease',
        animationDuration: 400,
        filterNull: true,
        useTranslate3d: false,
    };

    state = {
        boxWidth: -1,
        boxHeight: -1,
    };



    render() {
        const { content, active, wrapperStyle } = this.props;
        let outerStyle: CSSProperties = {
            pointerEvents: 'none',
            visibility: active ? 'visible' : 'hidden',
            position: 'absolute',
            top: 20,
            left: 20,
            ...wrapperStyle,
        };

        outerStyle = {
            ...outerStyle,
        };

        const cls = 'recharts-tooltip-wrapper-right'

        return (
            <div
                className={cls}
                style={outerStyle}
            >
                {renderContent(this.props)}
            </div>
        );
    }
}
