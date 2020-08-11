export const router=[

    {
        title:'控制台',
        icon:'laptop',
        key:'/index',
    },
    {
        title:'用户管理',
        icon:'laptop',
        key:'/index/user',
        child:
            [
                {
                    title:'用户列表',
                    icon:'laptop',
                    key:'/index/user/list',
                },
                {
                    title:'添加用户',
                    icon:'laptop',
                    key:'/index/user/add',
                    child:
                        [
                            {
                                title:'用户列表',
                                icon:'laptop',
                                key:'/index/user/lista',
                            },
                            {
                                title:'添加用户',
                                icon:'laptop',
                                key:'/index/user/adda',
                            },
                        ]
                },

            ]
    },
];

