import * as React from 'react';
import { Badge, Box } from "@chakra-ui/react";

interface ISettingItem {
    name: string;
    isLast?: boolean;
    isFirst?: boolean;
    isActive?: boolean;
    new?: boolean;
    onClick: () => void;
}

export const SettingItem: React.FC<ISettingItem> = (props: ISettingItem) => {
    const { isActive, isFirst, isLast, onClick } = props;
    return (
        <Box
            onClick={() => onClick?.()}
            display={'flex'}
            className="noselect"
            justifyContent={'space-between'}
            alignItems={'center'}
            px={'16px'}
            py={2}

            borderTopRadius={isFirst ? 'md' : ''}

            borderBottomColor={isLast ? '' : 'whiteAlpha.400'}
            borderBottomWidth={isLast ? '' : '1px'}
            borderBottomRadius={isLast ? 'md' : ''}

            cursor={'pointer'}
            background={isActive ? 'gray.600' : ''}
            _hover={{ background: 'gray.600' }}
        >

            <Box color="white">{props.name}</Box>
            {
                props.new && <Box><Badge colorScheme="green">NEW</Badge></Box>
            }
        </Box>
    )
};