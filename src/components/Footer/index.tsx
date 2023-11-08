import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'byyangrui';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'yrares',
          title: '用户中心',
          href: 'https://github.com/yrrrs',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/yrrrs',
          blankTarget: true,
        },
        {
          key: 'yonghu',
          title: 'User Center',
          href: 'https://github.com/yrrrs',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
