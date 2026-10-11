import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

type CompatibleLinkProps = Omit<RouterLinkProps, "to"> & {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
};

export default function Link({ href, prefetch: _prefetch, scroll: _scroll, ...props }: CompatibleLinkProps) {
  return <RouterLink to={href} {...props} />;
}
