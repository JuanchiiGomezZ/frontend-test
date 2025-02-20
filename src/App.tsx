import { useQuery } from '@apollo/client';
import { GET_IMAGES } from './graphql/queries';
import { ImagesQueryResponse } from './types/api';
import { ImageCard } from './features/gallery/components/ImageCard';

function App() {
  const { loading, error, data } = useQuery<ImagesQueryResponse>(GET_IMAGES);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <div>Error: {error.message}</div>;
  }

  // Debug: ver la estructura de los datos
  console.log('GraphQL Response:', data);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Images ({data?.images.edges.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {data?.images.edges.map(({ node }) => (
          <ImageCard key={node.id} {...node} />
        ))}
      </div>
    </div>
  );
}

export default App;
