import { Project, SkillGroup, Certificate, TimelineEvent, SystemLog, ProfileInfo } from './types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Ventilator using Arduino with Blood Oxygen Sensing',
    subtitle: 'Life-critical medical prototype with SpO2 feedback loops and mechanical actuation.',
    date: 'Jan 2023 - Apr 2023',
    description: 'This project involves building a basic ventilator system using an Arduino that can monitor blood oxygen (SpO2) and control airflow mechanically. Capable of real-time SpO2 monitoring and mechanical airflow control logic. Integrated with IoT modules for remote status tracking.',
    tags: ['ARDUINO_UNO', 'MAX30102', 'C++', 'ESP8266', 'OLED_DISPLAY'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnKUYGl_xCFsMT3dDSh2mQ0rD0IXXpBX9bhHZd_v-aRnDKgdAV9s9lxTMWkbVw1fHTzDEQ2wCAKB2-N-RwZopaz2WMcI3Y_dVZPFa1hz0EYC3NpW8DWyF06wHfq4DixHbWfrmMBkLsIEfkpIHPXUdBN1i3McPa5DaSCjToXZ19mToP9wYEBln4gExQyW0GeQ3OizFdFpX1DdmVsLwYTtWhd5UJJ6zsBOVGk9TBkS3d8a8tH6JwclSavI6OP93bru5bnoS8KTBygLU',
    status: 'STABLE_V1.0',
    refCode: 'SYS-VENT-092'
  },
  {
    id: 'proj-2',
    title: 'Smart Grid Interface',
    subtitle: 'Industrial conceptual design for PLC-based grid management and automation protocols.',
    date: 'Jul 2023 - Dec 2023',
    description: 'Developed high-precision grid monitoring and interface concepts for factory-floor electrical substations. Integrated multiple automation protocols with Siemens STEP7 and SCADA visualization layouts.',
    tags: ['PLC_SCADA', 'SIEMENS_STEP7', 'MODBUS', 'AUTOCAD_ELEC'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9-oCQZF34VHNRw6M33I6uXQNFjwtBW4-w9lCxReEl81vewi7y9B39HC3zgn-WWFB0q9ce_MhBkgpYZeNFqMoUvLCGdafVxGdWf5ntSsNsTBCjzQOg9ZZCgIY4GnpeGNek3EKylEcbmXiqDHBJ86a2udQ25FosEMoOUJnuamZDsCxMs_N3whAhbmxFCwhX_CWxgdC-15IyWa2tVstX3D4O78Oog-Xx45JdX_BBaJpm7vmbRwzCOx0wddrrU43ZKA5HVkgq1KzNqxg',
    status: 'ACTIVE_DEV',
    refCode: 'SYS-GRID-411'
  },
  {
    id: 'proj-3',
    title: 'Actuation Systems Hardware',
    subtitle: 'Optimization of KIMAX pneumatic and electromechanical actuation hardware.',
    date: 'Jun 2025 - Jul 2025',
    description: 'Performance optimization of high-precision valve actuators. Enhanced pneumatic response times and PID control loops on embedded STM32 chips, achieving a 14% improvement in positioning accuracy.',
    tags: ['STM32', 'PID_CONTROLLER', 'PNEUMATICS', 'LTSPICE'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQYixUz5y7vdWF_livFngHq_Jl97XbY7Nsng0aXK5GUQDsQGXmCsJLe3Ll-2GSMzI0DdESSEgxAdVARclnxpEaRc1PzjGzRe-usZr9HpuQ9pyw3Wu8qv2FH0krfjg9yQW3rOuX0HxrP8CHWNQu99sLIdqdscqYQ_nRFn96PSJSOV4QgKFBnZXAz_FazVzo2PMHjLezLTjs__0ELdlLlqriga3_7fCUPx0wNAjhDh0f6Kjn42mB1bbFE6uEsWqoZg2z8qFWdB5wlOA',
    status: 'COMPLETED',
    refCode: 'SYS-ACT-703'
  }
];

export const initialSkills: SkillGroup = {
  languages: ['Java', 'C / Embedded C', 'HTML / CSS / JavaScript', 'Assembly', 'MATLAB Scripting'],
  toolsAndTech: ['STM32 (CubeIDE)', 'LTspice', 'AutoCAD Electrical', 'PLC & SCADA', 'Arduino IDE', 'Altium Designer', 'Modbus TCP/IP'],
  softSkills: [
    'Quick learner in evolving tech environments',
    'Cross-functional team collaboration',
    'Technical rigor & analytical thinking',
    'Creative problem-solving in hardware constraints'
  ]
};

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'SIEMENS - Electronics Home Foundation',
    issuer: 'Siemens Industrial Training',
    description: 'Training Completed: Advanced core concepts in electronics foundation, hardware layouts, and industrial automation safety.',
    iconName: 'engineering'
  },
  {
    id: 'cert-2',
    title: 'SAEINDIA - Physics of Braking System',
    issuer: 'SAEINDIA Technical Academy',
    description: 'Deep dive into automotive braking physics, torque calculation, control mechanisms, and hydraulic actuation principles.',
    iconName: 'minor_crash'
  }
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: 'time-1',
    company: 'TI Tube products of India',
    role: 'Electrical Maintenance Intern',
    location: 'Avadi',
    date: 'Jul 2022 — Dec 2022',
    description: 'Worked on the development of Industrial Concepts. Collaborated with a team of engineers to enhance AutoCAD designs for factory floor power systems and machine installations.'
  },
  {
    id: 'time-2',
    company: 'TI Diamond Chain',
    role: 'Electrical Maintenance Intern',
    location: 'Ambattur',
    date: 'Jul 2023 — Dec 2023',
    description: 'Focused on the development of Industrial Concepts. Collaborated with a team of engineers to enhance PLC & SCADA systems for automated production lines and predictive diagnostics.'
  },
  {
    id: 'time-3',
    company: 'KIMAX Actuation Pvt Ltd',
    role: 'Technical Training',
    location: 'Arakkonam',
    date: 'Jul 2025 (Projected)',
    description: 'Scheduled intensive technical training on actuation systems, pneumatic controls, and precision feedback transducers in high-performance valves.',
    isProjected: true
  }
];

export const initialProfileInfo: ProfileInfo = {
  name: 'MOHAN KRISHNA K',
  email: 'mk1594722@gmail.com',
  phone: '+91 6374402537',
  linkedin: 'https://www.linkedin.com/in/mohan-krishna318',
  github: 'https://github.com/mohankrishna318',
  location: 'Pollachi, TN',
  title: 'Embedded & Electrical Design Engineer',
  objective: 'Embedded and Electrical Design Engineer with a strong foundation in Electrical and Electronics Engineering and hands-on experience in developing embedded applications and electrical designs. Seeking to leverage my technical skills and innovative mindset to contribute to product development at a reputed organization.',
  coreTools: 'STM32, AutoCAD, PLC, SCADA',
  systemVersion: '2.4.0 STABLE',
  uptimeDays: 324,
  uptimeHours: 12,
  uptimeMins: 45,
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQYixUz5y7vdWF_livFngHq_Jl97XbY7Nsng0aXK5GUQDsQGXmCsJLe3Ll-2GSMzI0DdESSEgxAdVARclnxpEaRc1PzjGzRe-usZr9HpuQ9pyw3Wu8qv2FH0krfjg9yQW3rOuX0HxrP8CHWNQu99sLIdqdscqYQ_nRFn96PSJSOV4QgKFBnZXAz_FazVzo2PMHjLezLTjs__0ELdlLlqriga3_7fCUPx0wNAjhDh0f6Kjn42mB1bbFE6uEsWqoZg2z8qFWdB5wlOA'
};

export const initialSystemLogs: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '10:04:12',
    type: 'INFO',
    source: 'SYS_GATEWAY',
    message: 'Authorized terminal listener bound to port 3000 successfully.'
  },
  {
    id: 'log-2',
    timestamp: '10:04:15',
    type: 'SUCCESS',
    source: 'CORE_KERNEL',
    message: 'Loaded system configurations. Version 2.4.0 is active and stable.'
  },
  {
    id: 'log-3',
    timestamp: '10:04:22',
    type: 'INFO',
    source: 'ADC_CALIBRATION',
    message: 'ADC channels initialized. X-axis calibration parameters retrieved.'
  },
  {
    id: 'log-4',
    timestamp: '10:05:01',
    type: 'SUCCESS',
    source: 'PLC_COMMS',
    message: 'Modbus TCP connection established with SIEMENS-S7 controller at node 12.'
  },
  {
    id: 'log-5',
    timestamp: '10:05:02',
    type: 'INFO',
    source: 'ACTUATION_UNIT',
    message: 'KIMAX valve feedback loop reporting within optimal bounds (error <= 0.02%).'
  },
  {
    id: 'log-6',
    timestamp: '10:12:31',
    type: 'WARN',
    source: 'POWER_BUS',
    message: 'Minor voltage fluctuation detected on bus B: +1.2% dev. Suppressed by filtering cap.'
  }
];
