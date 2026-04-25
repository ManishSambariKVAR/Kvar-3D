import dataLoggersImg from '../assets/Data_loggers.png';
import indicatorsImg from '../assets/Indicators.png';
import informationDisplayImg from '../assets/Scrolling_display.png';
import ampereHourMeterImg from '../assets/Ampere_hour_meters.png';
import digitalClocksImg from '../assets/digital_clock.png';
import industrialDisplaysImg from '../assets/Status.png';
import transportTrafficImg from '../assets/Environmental Monitoring Systems.png';
import priceRateImg from '../assets/Petrol_rate_display.png';
import specialCountersImg from '../assets/Drink-Dispensing-Counter.png';
import airQualityMonitorImg from '../assets/Environmental Monitoring Systems.png';
import ledDisplayBoardImg from '../assets/LED Display Board.png';
import scoreBoardImg from '../assets/Score Display Board.png';
import queueManagementImg from '../assets/Queue Management.png';
import flowTotalizerImg from '../assets/Flow Totalizer.png';
import digitalCounterImg from '../assets/Digital Counter.png';
import machineVisionImg from '../assets/Machine Vision System.png';
import advertisingServicesImg from '../assets/Indoor Advertising Display 2.5.png';
import aqmSolutionImg from '../assets/Environmental Monitoring Systems.png';
import ethernetModuleImg from '../assets/Ethernet Module.png';

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    modelPath: string | null;
    imageUrl: string;
}

export const categories = [
    'All',
    'Displays',
    'Loggers & Meters',
    'IoT & Smart',
    'Counters & Timers',
    'Scoreboards & Signs',
    'Monitoring',
    'Services',
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
    {
        id: 'data-loggers',
        name: 'Data Loggers',
        description:
            'Electronic instruments that capture and record process data such as temperature, humidity, pressure, flow, voltage, and current — available with multi-channel options and connectivity.',
        category: 'Loggers & Meters',
        icon: 'Database',
        modelPath: '',
        imageUrl: dataLoggersImg,
    },
    
    {
        id: 'indicators-display',
        name: 'Indicators Display',
        description:
            'A range of industrial indicator displays including wind speed, Modbus LED, Profibus LED, digital temperature indicators, and large LED displays.',
        category: 'Displays',
        icon: 'Monitor',
        modelPath: '',
        imageUrl: indicatorsImg,
    },
    {
        id: 'ampere-hour-meter',
        name: 'Ampere Hour Meter',
        description:
            'Instruments for battery monitoring and electroplating applications with versatile counting, relay outputs, programmable shunt, and power-fail retention.',
        category: 'Loggers & Meters',
        icon: 'Zap',
        modelPath: '',
        imageUrl: ampereHourMeterImg,
    },
    {
        id: 'digital-clocks',
        name: 'Digital Clocks',
        description:
            'Digital clocks for time/date/day display with options like world clock, alarms and GPS synchronization — suitable for indoor and outdoor usage.',
        category: 'Counters & Timers',
        icon: 'Clock',
        modelPath: '/clock.glb',
        imageUrl: digitalClocksImg,
    },
    {
        id: 'transport-traffic',
        name: 'Transport & Traffic Displays',
        description:
            'Displays to guide, control, and manage transport/traffic by showing dynamic information in a quick, readable way — with central control and multiple communication options.',
        category: 'Displays',
        icon: 'Bus',
        modelPath: '',
        imageUrl: transportTrafficImg,
    },
    {
        id: 'price-rate-displays',
        name: 'Price & Rate Displays',
        description:
            'Bright, eye-catching displays to show rates/prices in real-time for retail and commercial premises with multiple interfaces and easy updating.',
        category: 'Scoreboards & Signs',
        icon: 'IndianRupee',
        modelPath: '',
        imageUrl: priceRateImg,
    },
    {
        id: 'special-purpose-counters',
        name: 'Special Purpose Counters',
        description:
            'Counters designed for specific applications where accurate counting is crucial — with sensor interfaces, relay outputs, and power-fail retention.',
        category: 'Counters & Timers',
        icon: 'Hash',
        modelPath: '',
        imageUrl: specialCountersImg,
    },
    {
        id: 'air-quality-monitor2',
        name: 'Air Quality Monitor',
        description:
            'Environmental monitoring products for air quality, dust monitoring, and air pollution monitoring applications.',
        category: 'Monitoring',
        icon: 'Wind',
        modelPath: '',
        imageUrl: airQualityMonitorImg,
    },  
    {
        id: 'led-display-board',
        name: 'Led Display Board',
        description:
            'A complete choice of LED display products including indoor LED display, jewellery rate display boards, outdoor LED video display and LED advertising display standee.',
        category: 'Scoreboards & Signs',
        icon: 'Tv',
        modelPath: null,
        imageUrl: ledDisplayBoardImg,
    },
    {
        id: 'digital-score-board-display',
        name: 'Digital Score Board Display',
        description:
            'Scoreboards for cricket, football, basketball, kabaddi and more — built for clear visibility and reliable operation.',
        category: 'Scoreboards & Signs',
        icon: 'Trophy',
        modelPath: null,
        imageUrl: scoreBoardImg,
    },
    {
        id: 'queue-management',
        name: 'Queue Management',
        description:
            'A range of queue solutions including token management, queue management systems and vision identification systems.',
        category: 'IoT & Smart',
        icon: 'Users',
        modelPath: null,
        imageUrl: queueManagementImg,
    },
    {
        id: 'flow-totalizer',
        name: 'Flow Totalizer',
        description:
            'Products including programmable flow rate indicator/totalizer with logger and flow rate meters.',
        category: 'Loggers & Meters',
        icon: 'Droplets',
        modelPath: null,
        imageUrl: flowTotalizerImg,
    },
    {
        id: 'digital-counter',
        name: 'Digital Counter',
        description: 'Digital counter meter products for industrial counting and measurement applications.',
        category: 'Counters & Timers',
        icon: 'Binary',
        modelPath: null,
        imageUrl: digitalCounterImg,
    },
    {
        id: 'machine-vision-system',
        name: 'Machine Vision System',
        description: 'Machine vision system solutions for industrial applications.',
        category: 'Monitoring',
        icon: 'Eye',
        modelPath: null,
        imageUrl: machineVisionImg,
    },
    {
        id: 'advertising-services',
        name: 'Advertising Services',
        description: 'Indoor advertising display solutions for commercial spaces and branding requirements.',
        category: 'Services',
        icon: 'Tv',
        modelPath: null,
        imageUrl: advertisingServicesImg,
    },
    {
        id: 'air-quality-monitoring-solution',
        name: 'Air Quality Monitoring Solution',
        description:
            'AQM systems for monitoring and displaying pollutants like PM2.5/PM10 and gases (CO₂, CO, NO, NOx, SOx) using sensors, data logger and display.',
        category: 'Monitoring',
        icon: 'Wind',
        modelPath: '',
        imageUrl: aqmSolutionImg,
    },
    {
        id: 'ethernet-module',
        name: 'Ethernet Module',
        description: 'Ethernet/LAN network module products including ENC28J60-based modules.',
        category: 'IoT & Smart',
        icon: 'Network',
        modelPath: '/Alarm.glb',
        imageUrl: ethernetModuleImg,
    },
];
