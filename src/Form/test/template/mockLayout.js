
import React from 'react';
export const templates = {
    "sub-field-0": <span>Hello</span>,
    "sub-field-0-1": <span>Hello</span>,
    "sub-field-1-1-1": <span>Hello</span>,
    "sub-field-1-1-11-1-1": <span>Hello</span>,
    "sub-field-1-1-11-1-1-1": <span>Hello</span>,
    "sub-field-2-1": <span>Hello</span>,
    "sub-field-2": <span>Hello</span>,
    "sub-field-3": <span>Hello</span>,
    "sub-field-3-1": <span>Hello</span>,
};
const theme = [
    {
        groupId: 'groupId0',
        className: 'groupId0-class',
        style: {
            width: '100%',
            height: '100%',
        },
        subGroup: [
            {
                field: 'sub-field-0',
                className: 'sub-field-0-class',
                style: {
                    fontSize: '12px',
                }
            },
            {
                field: 'sub-field-0-1',
                className: 'sub-field-0-1-class',
                style: {
                    fontSize: '13px',
                }
            }
        ],
    },
    {
        groupId: 'groupId1',
        className: 'groupId1-class',
        subGroup: [
            {
                groupId: 'sub-groupId-1',
                className: 'sub-groupId-1-class',
                subGroup: [
                    {
                        groupId: 'sub-groupId-1-1',
                        className: 'sub-groupId-1-1-class',
                        subGroup: [
                            {
                                field: 'sub-field-1-1-1',
                                className: 'sub-field-1-1-1-class',
                                style: {
                                    fontSize: '14px',
                                }
                            },
                            {
                                groupId: 'groupId1-1-1-1-1',
                                className: 'groupId1-1-1-1-1-class',
                                subGroup: [
                                    {
                                        field: 'sub-field-1-1-11-1-1',
                                        className: 'sub-field-1-1-11-1-1-class',
                                        style: {
                                            fontSize: '15px',
                                        }
                                    },
                                    {
                                        field: 'sub-field-1-1-11-1-1-1',
                                        className: 'sub-field-1-1-11-1-1-1-class',
                                        style: {
                                            fontSize: '16px',
                                        }
                                    }
                                ]
                            }
                        ]
                    }, {
                        field: 'sub-field-2-1',
                        className: 'sub-field-2-1-class',
                        style: {
                            fontSize: '17px',
                        }
                    }
                ]
            },
            {
                field: 'sub-field-2',
                className: 'sub-field-2-class',
                style: {
                    fontSize: '18px',
                }
            }
        ]
    },
    {
        groupId: 'groupId3',
        className: 'groupId3-class',
        subGroup: [
            {
                field: 'sub-field-3',
                className: 'sub-field-3-class',
                style: {
                    fontSize: '19px',
                }
            },
            {
                field: 'sub-field-3-1',
                className: 'sub-field-3-1-class',
                style: {
                    fontSize: '20px',
                }
            }
        ],
    },
];
export default theme;
