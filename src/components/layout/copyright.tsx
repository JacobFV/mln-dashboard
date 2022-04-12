import { Center } from '@mantine/core';
import Link from 'next/link';
import { appname } from '../../common/constants';

export default function Copyright() {
    return (
      <Center>
        {'Copyright © '}
        <Link href="/">{appname}</Link>
        {' '}{new Date().getFullYear()}{'.'}
      </Center>
    );
}