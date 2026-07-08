import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AppShell } from './components/AppShell';
import { AdminPage } from './pages/AdminPage';
import { AreasPage } from './pages/AreasPage';
import { AssignmentDetailPage } from './pages/AssignmentDetailPage';
import { AssignmentGamePage } from './pages/AssignmentGamePage';
import { BroadcastUpdateDetailPage } from './pages/BroadcastUpdateDetailPage';
import { JoinClassPage } from './pages/JoinClassPage';
import { LandingPage } from './pages/LandingPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LoginPage } from './pages/LoginPage';
import { MediaProjectDetailPage } from './pages/MediaProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TeacherPage } from './pages/TeacherPage';
import { TeacherSchedulePage } from './pages/TeacherSchedulePage';
import { TeacherStudentPreviewPage } from './pages/TeacherStudentPreviewPage';
import { TodayPage } from './pages/TodayPage';
import { UnrealAreaPage } from './pages/UnrealAreaPage';
import { VideoProductionAreaPage } from './pages/VideoProductionAreaPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/today" element={<TodayPage />} />
          <Route path="/student/game" element={<AssignmentGamePage />} />
          <Route path="/join-class" element={<JoinClassPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/areas/unreal-engine" element={<UnrealAreaPage />} />
          <Route path="/areas/video-production" element={<VideoProductionAreaPage />} />
          <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentDetailPage />} />
          <Route path="/media-projects/:projectId" element={<MediaProjectDetailPage />} />
          <Route path="/broadcast-updates/:updateId" element={<BroadcastUpdateDetailPage />} />
          <Route element={<ProtectedRoute allowedRoles={['teacher', 'admin']} />}>
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
            <Route
              path="/teacher/classes/:classId/student-preview"
              element={<TeacherStudentPreviewPage />}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
