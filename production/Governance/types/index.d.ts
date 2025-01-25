export namespace API {
    export type NoticeIconList = {
        data?: NoticeIconItem[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

    export type NoticeIconItem = {
        id?: string;
        extra?: string;
        key?: string;
        read?: boolean;
        avatar?: string;
        title?: string;
        status?: string;
        datetime?: string;
        description?: string;
        type?: NoticeIconItemType;
    };

    export type NoticeIconItemType = 'notification' | 'message' | 'event';

    export type PageParams = {
        current?: number;
        pageSize?: number;
    };

    export type RuleList = {
        data?: RuleListItem[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
    };

    export type RuleListItem = {
        key?: number;
        disabled?: boolean;
        href?: string;
        avatar?: string;
        name?: string;
        owner?: string;
        desc?: string;
        callNo?: number;
        status?: number;
        updatedAt?: string;
        createdAt?: string;
        progress?: number;
    };
}
