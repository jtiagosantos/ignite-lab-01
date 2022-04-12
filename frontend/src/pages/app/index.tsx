import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMeQuery } from '../../graphql/generated/graphql';
import { ssrGetProducts } from '../../graphql/generated/page';
import { withApollo } from '../../services/withApollo';

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div>
      <h1>Hello World</h1>
      user: <pre>{JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // getServerPageGetProducts({}, ctx)

    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
