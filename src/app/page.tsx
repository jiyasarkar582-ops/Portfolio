import VideoIntro from '@/components/VideoIntro';
import ResumeShowcase from '@/components/ResumeShowcase';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Cinematic Video hero segment */}
      <VideoIntro />

      {/* Curriculum Vitae, Projects & Contact Grid */}
      <ResumeShowcase />
    </main>
  );
}
