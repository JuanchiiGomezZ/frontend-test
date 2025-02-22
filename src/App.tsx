import { useQuery } from '@apollo/client';
import { GET_IMAGES } from './graphql/queries';
import { ImagesQueryResponse } from './types/api';
import ImagesList from './components/features/gallery/ImagesList';
import ContentLayout from './components/ui/Layout/ContentLayout.';

const ITEMS_PER_PAGE = 24;

function App() {
  const { loading, error, data, fetchMore } = useQuery<ImagesQueryResponse>(
    GET_IMAGES,
    {
      variables: {
        first: ITEMS_PER_PAGE,
        after: null,
      },
    }
  );

  const handleLoadMore = () => {
    if (data?.images.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first: ITEMS_PER_PAGE,
          after: data.images.pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Images ({data?.images.nodes.length})
      </h1>
      <ContentLayout>
        <ImagesList
          items={data?.images.nodes || []}
          isLoading={loading}
          onLoadMore={handleLoadMore}
          hasMore={!!data?.images.pageInfo?.hasNextPage}
          error={error}
        />
      </ContentLayout>
    </div>
  );
}

export default App;
