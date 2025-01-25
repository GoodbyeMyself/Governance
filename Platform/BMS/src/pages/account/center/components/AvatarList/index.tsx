// React
import React from 'react';
// antd
import { Avatar, Tooltip } from 'antd';
// 简化管理 CSS 类名的复杂度， 动态组装 类名
import classNames from 'classnames';
// 样式表
import useStyles from './index.style';

// 这个语句中的 declare 告诉 TypeScript 编译器，SizeType 类型已经在某个地方被定义了，可能是在其他文件中的声明或者是在某个库中定义的。
// 这样做的目的是告诉编译器不要在编译过程中把 SizeType 当作一个新的变量或类型来处理，而是把它当作一个已经存在的类型来使用。
// 通常情况下，declare 关键字与 export 结合使用，用于声明并导出类型、变量、函数等，使其可以在其他文件中使用。
export declare type SizeType = number | 'small' | 'default' | 'large';

export type AvatarItemProps = {
    tips: React.ReactNode;
    src: string;
    size?: SizeType;
    style?: React.CSSProperties;
    onClick?: () => void;
};

export type AvatarListProps = {
    Item?: React.ReactElement<AvatarItemProps>;
    size?: SizeType;
    maxLength?: number;
    excessItemsStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    children: React.ReactElement<AvatarItemProps> | React.ReactElement<AvatarItemProps>[];
};

const Item: React.FC<AvatarItemProps> = ({ src, size, tips, onClick = () => {} }) => {

    // 样式表
    const { styles } = useStyles();

    // 函数
    const avatarSizeToClassName = (size?: SizeType | 'mini') =>
        classNames(styles.avatarItem, {
            [styles.avatarItemLarge]: size === 'large',
            [styles.avatarItemSmall]: size === 'small',
            [styles.avatarItemMini]: size === 'mini',
        });

    // 动态 生成类名
    const cls = avatarSizeToClassName(size);

    return (
        <li className={cls} onClick={onClick}>
            {tips ? (
                <Tooltip title={tips}>
                    <Avatar
                        src={src}
                        size={size}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
            ) : (
                <Avatar src={src} size={size} />
            )}
        </li>
    );
};

const AvatarList: React.FC<AvatarListProps> & {
    Item: typeof Item;
} = ({ children, size, maxLength = 5, excessItemsStyle, ...other }) => {

    // 样式表
    const { styles } = useStyles();

    // 函数
    const avatarSizeToClassName = (size?: SizeType | 'mini') =>
        classNames(styles.avatarItem, {
            [styles.avatarItemLarge]: size === 'large',
            [styles.avatarItemSmall]: size === 'small',
            [styles.avatarItemMini]: size === 'mini',
        });

    const numOfChildren = React.Children.count(children);

    const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;

    const childrenArray = React.Children.toArray(children) as React.ReactElement<AvatarItemProps>[];

    const childrenWithProps = childrenArray.slice(0, numToShow).map((child) =>
        React.cloneElement(child, {
            size,
        }),
    );

    if (numToShow < numOfChildren) {
        const cls = avatarSizeToClassName(size);
        childrenWithProps.push(
            <li key="exceed" className={cls}>
                <Avatar size={size} style={excessItemsStyle}>{`+${
                    numOfChildren - maxLength
                }`}</Avatar>
            </li>,
        );
    }
    
    return (
        <div {...other} className={styles.avatarList}>
            <ul> {childrenWithProps} </ul>
        </div>
    );
};

AvatarList.Item = Item;

export default AvatarList;
