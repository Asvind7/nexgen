import CONFIG_V2 from '../data/nexgen_config_v2.json';
import { SYLLABUS_DETAILS } from '../data/syllabus_details';

// --- NEW V2 ENGINE: PARSES THE COMPREHENSIVE MANIFEST ---
export const generateSyllabus = (level, earnedXp, avgTime, isAdmin = false, completedModuleIds = []) => {
  console.log(`V2 Engine: Generating path for Level: ${level} (Admin: ${isAdmin}) - ${completedModuleIds.length} done`);

  const manifest = CONFIG_V2.comprehensive_syllabus_manifest;
  const regions = [];
  let regionCounter = 1;

  // --- REFINED WATERFALL LOGIC ---
  let firstLockedFound = false;

  // Helper to process a week
  const processWeek = (weekKey, weekData, phaseName) => {
    const modules = weekData.modules || [];
    const project = weekData.project;
    const exam = weekData.milestone_exam;

    // Determine target phase based on level
    let targetPhase = "Phase 1";
    if (level === "Intermediate") targetPhase = "Phase 2";
    if (level === "Advanced") targetPhase = "Phase 3";

    const phases = ["Phase 1", "Phase 2", "Phase 3"];
    const currentPhaseIdx = phases.indexOf(phaseName);
    const targetPhaseIdx = phases.indexOf(targetPhase);

    // Regions before the target phase are considered "completed by placement"
    // BUT if admin, we want to see them as playable/active nodes instead of auto-completed.
    const isRegionSkipped = !isAdmin && currentPhaseIdx < targetPhaseIdx;

    if (isAdmin) console.log(`Week ${weekKey} (Phase ${phaseName}) - Admin Unlocked`);

    const levels = [];

    // 1. PROCESS LESSONS
    modules.forEach((topic, idx) => {
      const moduleId = `${weekKey}-topic-${idx}`;
      const isCompleted = isRegionSkipped || completedModuleIds.includes(moduleId);
      let status = 'locked';

      if (isCompleted) {
        status = 'completed';
      } else if (isAdmin) {
        status = 'active'; // Admin sees everything as active or completed
      } else if (!firstLockedFound) {
        status = 'active';
        firstLockedFound = true;
      }

      const details = SYLLABUS_DETAILS[topic] || [
        { title: `Intro to ${topic}`, codeTask: `print("Hello ${topic}")`, context: `Basics of ${topic}` },
        { title: `${topic} Usage`, codeTask: `print("${topic} Rules")`, context: `Using ${topic}` }
      ];

      levels.push({
        id: moduleId,
        title: topic,
        type: 'lesson',
        status: status,
        description: `Master the art of ${topic}.`,
        subLessons: details
      });
    });

    // 2. PROCESS EXAM
    if (exam) {
      const examId = `${weekKey}-exam`;
      const isCompleted = isRegionSkipped || completedModuleIds.includes(examId);
      let examStatus = 'locked';

      if (isCompleted) {
        examStatus = 'completed';
      } else if (isAdmin) {
        examStatus = 'active';
      } else if (!firstLockedFound) {
        examStatus = 'active';
        firstLockedFound = true;
      }

      levels.push({
        id: examId,
        title: `EXAM: ${exam}`,
        type: 'master',
        status: examStatus,
        description: "Prove your mastery to advance."
      });
    }

    // 3. PROCESS PROJECT
    if (project) {
      const projectId = `${weekKey}-project`;
      const isCompleted = isRegionSkipped || completedModuleIds.includes(projectId);
      let projectStatus = 'locked';

      if (isCompleted) {
        projectStatus = 'completed';
      } else if (isAdmin) {
        projectStatus = 'active';
      } else if (!firstLockedFound) {
        projectStatus = 'active';
        firstLockedFound = true;
      }

      levels.push({
        id: projectId,
        title: `PROJECT: ${project}`,
        type: 'project',
        status: projectStatus,
        description: "Build a real-world application.",
        projectTitle: project
      });
    }

    // 🆕 4. Add Phase Master (If end of phase)
    const phaseKeys = Object.keys(manifest);
    const currentPhaseIndex = phaseKeys.findIndex(pk => manifest[pk][weekKey]);

    if (currentPhaseIndex !== -1) {
      const phaseWeeks = Object.keys(manifest[phaseKeys[currentPhaseIndex]] || {});
      const lastWeekOfPhase = phaseWeeks[phaseWeeks.length - 1];

      if (weekKey === lastWeekOfPhase) {
        const pmId = `phase-master-${currentPhaseIndex + 1}`;
        const isCompleted = isRegionSkipped || completedModuleIds.includes(pmId);
        let pmStatus = 'locked';

        if (isCompleted) {
          pmStatus = 'completed';
        } else if (isAdmin) {
          pmStatus = 'active';
        } else if (!firstLockedFound) {
          pmStatus = 'active';
          firstLockedFound = true;
        }

        levels.push({
          id: pmId,
          title: `PHASE ${currentPhaseIndex + 1} MASTER`,
          type: 'phase_master',
          status: pmStatus,
          description: `Complete Phase ${currentPhaseIndex + 1} and unlock the next frontier.`
        });
      }
    }

    regions.push({
      id: `region-${weekKey}`,
      title: `${phaseName} - ${weekKey.replace(/_/g, ' ').toUpperCase()}`,
      levels: levels
    });
  };

  // --- PARSE PHASES ---
  // Phase 1
  Object.entries(manifest.phase_1_fundamentals).forEach(([key, data]) => processWeek(key, data, "Phase 1"));
  // Phase 2
  Object.entries(manifest.phase_2_intermediate).forEach(([key, data]) => processWeek(key, data, "Phase 2"));
  // Phase 3
  Object.entries(manifest.phase_3_advanced).forEach(([key, data]) => processWeek(key, data, "Phase 3"));

  return {
    id: 'python-v2',
    title: 'NexGen Python Mastery V2',
    level: level, // Add level to syllabus object for UI use
    description: 'The complete adaptive path from Novice to Data Scientist.',
    modules: regions
  };
};