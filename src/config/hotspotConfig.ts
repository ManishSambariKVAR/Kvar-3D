export interface HotspotData {
    id: string;
    position: [number, number, number];
    cameraPosition: [number, number, number];
    cameraLookAt: [number, number, number];
    title: string;
    description: string;
    size?: [number, number, number];
}

export const hotspotConfig: HotspotData[] = [
    {
        id: 'lcd-display',
        position: [-0.26, 0.5, 0.75],        // center-x, upper-y, front face
        cameraPosition: [-0.26, 0.5, 2.5],
        cameraLookAt: [-0.26, 0.5, 0.75],
        title: 'LCD Display',
        description: 'High-resolution display showing real-time air quality measurements.',
        size: [0.5, 0.3, 0.05],
    },
    {
        id: 'pm-sensor',
        position: [-0.5, 0.1, 0.75],         // left side, front face
        cameraPosition: [-1.5, 0.1, 2],
        cameraLookAt: [-0.5, 0.1, 0.75],
        title: 'PM Sensor',
        description: 'Particulate Matter sensor detecting PM2.5 and PM10.',
        size: [0.2, 0.2, 0.05],
    },
    {
        id: 'temperature-section',
        position: [-0.26, -0.1, 0.75],       // center, lower-y, front face
        cameraPosition: [0.5, -0.1, 2],
        cameraLookAt: [-0.26, -0.1, 0.75],
        title: 'Temperature & Humidity',
        description: 'Environmental sensor measuring temperature and humidity.',
        size: [0.2, 0.2, 0.05],
    },
];
