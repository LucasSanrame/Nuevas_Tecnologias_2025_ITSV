import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '../config';

const styles = {
  buttons: {
    display: 'flex',
    gap: '1rem',
    margin: '1rem 0',
  },
  display: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    margin: '1rem 0',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  language: {
    display: 'block',
    marginTop: '0.5rem',
    color: '#666',
    fontStyle: 'italic',
  },
  characterImg: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
} as const;

const touhouCharacters = [
  { 
    name: "Reimu Hakurei", 
    description: "La miko del Santuario Hakurei.",
    image: "https://static.wikia.nocookie.net/touhou/images/6/6b/Reimu_Hakurei_Th17.png" 
  },
  { 
    name: "Marisa Kirisame", 
    description: "La bruja amante de la magia y los robos.",
    image: "https://static.wikia.nocookie.net/touhou/images/7/7c/Marisa_Kirisame_Th17.png"
  },
  { 
    name: "Sakuya Izayoi", 
    description: "La sirvienta que controla el tiempo.",
    image: "https://static.wikia.nocookie.net/touhou/images/2/2e/Sakuya_Izayoi_Th17.png"
  },
  { 
    name: "Remilia Scarlet", 
    description: "La vampiresa de la Mansión Scarlet Devil.",
    image: "https://static.wikia.nocookie.net/touhou/images/6/6b/Remilia_Scarlet_Th17.png"
  },
  { 
    name: "Cirno", 
    description: "La hada de hielo autoproclamada como la más fuerte.",
    image: "https://static.wikia.nocookie.net/touhou/images/2/2b/Cirno_Th17.png"
  },
  // Agrega más personajes aquí...
];

const Home: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<{ name: string, description: string, image: string } | null>(null);

  const fetchCharacter = () => {
    const randomIndex = Math.floor(Math.random() * touhouCharacters.length);
    setCharacter(touhouCharacters[randomIndex]);
  };

  useEffect(() => {
    // Check for current session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error.message);
        navigate('/login');
        return;
      }
      
      if (!data.session) {
        // No active session, redirect to login
        navigate('/login');
        return;
      }
      
      // Session exists, get user data
      setUser(data.session.user);
      setLoading(false);
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        } else if (session) {
          setUser(session.user);
        }
      }
    );
    
    return () => {
      // Clean up the subscription
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        return;
      }
      navigate('/login');
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Touhou Random Character!</h1>
      <img 
        className="inner-container"
        src="https://pnctschmbeqswueglzaz.supabase.co/storage/v1/object/public/assets/oops.png"
        alt="A cute raccoon peeking out from behind a trash can, with a surprised expression"
      />
      
      {user && (
        <div className="user-info">
          <p>Logged in as: {user.email}</p>
          {user.user_metadata?.full_name && (
            <p>Name: {user.user_metadata.full_name}</p>
          )}
        </div>
      )}
      
      <div style={styles.buttons}>
        <button onClick={fetchCharacter}>Obtener personaje aleatorio</button>
      </div>
      {character && (
        <div style={styles.display}>
          <img 
            src={character.image} 
            alt={character.name} 
            style={styles.characterImg}
          />
          <p><strong>{character.name}</strong></p>
          <small style={styles.language}>{character.description}</small>
        </div>
      )}
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;