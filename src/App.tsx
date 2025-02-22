import { useQuery } from '@apollo/client';
import { GET_IMAGES } from './graphql/queries';
import { ImagesQueryResponse } from './types/api';
import ImagesList from './components/features/gallery/ImagesList';
import ContentLayout from './components/ui/Layout/ContentLayout.';

function App() {
  const { loading, error, data } = useQuery<ImagesQueryResponse>(GET_IMAGES);

  if (loading || !data) return <div>Loading...</div>;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Images ({data?.images.nodes.length})
      </h1>
      <ContentLayout>
        <ImagesList data={data} />
      </ContentLayout>
    </div>
  );
}

export default App;
