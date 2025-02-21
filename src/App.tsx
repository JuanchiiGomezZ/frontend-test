import { useQuery } from '@apollo/client';
import { GET_IMAGES } from './graphql/queries';
import { ImagesQueryResponse } from './types/api';
import ImagesList from './features/gallery/components/ImagesList';

function App() {
  const { loading, error, data } = useQuery<ImagesQueryResponse>(GET_IMAGES);

  if (loading || !data) return <div>Loading...</div>;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Images ({data?.images.edges.length})
      </h1>
      <ImagesList data={data} />
    </div>
  );
}

export default App;
