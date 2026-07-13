import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AppShell } from './components/AppShell';
import { AdminPage } from './pages/AdminPage';
import { AreasPage } from './pages/AreasPage';
import { AssignmentDetailPage } from './pages/AssignmentDetailPage';
import { BroadcastUpdateDetailPage } from './pages/BroadcastUpdateDetailPage';
import { HiddenFrameArchivePage } from './hidden-frame/pages/HiddenFrameArchivePage';
import { HiddenFrameCameraPage } from './hidden-frame/pages/HiddenFrameCameraPage';
import { HiddenFrameCollectionPage } from './hidden-frame/pages/HiddenFrameCollectionPage';
import { HiddenFrameFilePage } from './hidden-frame/pages/HiddenFrameFilePage';
import { HiddenFrameLandingPage } from './hidden-frame/pages/HiddenFrameLandingPage';
import { HiddenFrameRenderRoomPage } from './hidden-frame/pages/HiddenFrameRenderRoomPage';
import { HiddenFrameTimelinePage } from './hidden-frame/pages/HiddenFrameTimelinePage';
import { HiddenFrameUnrealPage } from './hidden-frame/pages/HiddenFrameUnrealPage';
import { JoinClassPage } from './pages/JoinClassPage';
import { LandingPage } from './pages/LandingPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LoginPage } from './pages/LoginPage';
import { MediaProjectDetailPage } from './pages/MediaProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudentGamePage } from './pages/StudentGamePage';
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
          <Route path="/join-class" element={<JoinClassPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/areas/unreal-engine" element={<UnrealAreaPage />} />
          <Route path="/areas/video-production" element={<VideoProductionAreaPage />} />
          <Route path="/hidden-frame" element={<HiddenFrameLandingPage />} />
          <Route path="/hidden-frame/archive" element={<HiddenFrameArchivePage />} />
          <Route path="/hidden-frame/collection" element={<HiddenFrameCollectionPage />} />
          <Route path="/hidden-frame/timeline" element={<HiddenFrameTimelinePage />} />
          <Route path="/hidden-frame/camera" element={<HiddenFrameCameraPage />} />
          <Route path="/hidden-frame/render-room" element={<HiddenFrameRenderRoomPage />} />
          <Route path="/hidden-frame/unreal" element={<HiddenFrameUnrealPage />} />
          <Route path="/hidden-frame/file/001" element={<HiddenFrameFilePage />} />
          <Route path="/hidden-frame/file/:fileId" element={<HiddenFrameFilePage />} />
          <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentDetailPage />} />
          <Route path="/media-projects/:projectId" element={<MediaProjectDetailPage />} />
          <Route path="/broadcast-updates/:updateId" element={<BroadcastUpdateDetailPage />} />
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/game" element={<StudentGamePage />} />
          </Route>
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
