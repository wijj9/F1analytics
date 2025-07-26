import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSchedule, ScheduleEvent } from '@/lib/api';
import { useSeason } from '@/contexts/SeasonContext';
import { DateTime } from 'luxon';
// Import the JSON data directly
import raceData2025 from '@/data/2025.json';

interface SessionData {
    session: string;
    time: string;
}

interface LocalRaceData {
    slug: string;
    circuit: string;
    country: string;
    sessions: { [key: string]: string }; // UTC ISO strings
}

const twitchParent = window.location.hostname;

const Live: React.FC = () => {
    const [isLive] = useState(false);
    const { selectedYear } = useSeason();
    const [localSessions, setLocalSessions] = useState<Record<string, SessionData[]>>({});

    const { data: scheduleData, isLoading } = useQuery<ScheduleEvent[]>({
        queryKey: ['schedule', selectedYear],
        queryFn: () => fetchSchedule(selectedYear),
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    });

    useEffect(() => {
        const loadLocalSessionData = () => {
            try {
                // Use the imported data directly for 2025, or fetch for other years
                let raceDataToUse: LocalRaceData[] = [];

                if (selectedYear === 2025) {
                    raceDataToUse = raceData2025 as LocalRaceData[];
                } else {
                    // For other years, you might want to import other JSON files or handle differently
                    console.warn(`No local data available for year ${selectedYear}`);
                    return;
                }

                const sessionMap: Record<string, SessionData[]> = {};

                raceDataToUse.forEach((race) => {
                    const sessions: SessionData[] = [];

                    Object.entries(race.sessions).forEach(([sessionName, rawTimeStr]) => {
                        // ✅ Force Luxon to parse as Berlin time, IGNORING the "Z"
                        const berlinTime = DateTime.fromFormat(rawTimeStr, "yyyy-MM-dd'T'HH:mm:ss'Z'", {
                            zone: 'Europe/Berlin',
                        });

                        // 🔁 Convert to UTC for display
                        const utcTime = berlinTime.setZone('utc');

                        sessions.push({
                            session: sessionName,
                            time: `${berlinTime.toFormat('dd MMM, HH:mm')} (UTC ${utcTime.toFormat('HH:mm')})`,
                        });
                    });




                    // Use both slug and country+circuit as keys for better matching
                    sessionMap[race.slug] = sessions;
                    sessionMap[`${race.country.toLowerCase()}-${race.circuit.toLowerCase()}`] = sessions;
                });

                setLocalSessions(sessionMap);
            } catch (error) {
                console.error('Error loading local session data:', error);
            }
        };

        loadLocalSessionData();
    }, [selectedYear]);

    // Find the next upcoming race
    const nextRace = (scheduleData || [])
        .filter((event) => new Date(event.EventDate) >= new Date())
        .sort((a, b) => new Date(a.EventDate).getTime() - new Date(b.EventDate).getTime())[0];

    // Helper function to find matching sessions for a race
    const getSessionsForRace = (race: ScheduleEvent) => {
        if (!race) return [];

        // Try multiple matching strategies
        const possibleKeys = [
            race.EventName?.toLowerCase().replace(/\s+/g, '-'),
            `${race.Country?.toLowerCase()}-${race.Location?.toLowerCase()}`,
            race.Location?.toLowerCase().replace(/\s+/g, '-'),
        ].filter(Boolean);

        for (const key of possibleKeys) {
            if (localSessions[key as string]) {
                return localSessions[key as string];
            }
        }

        // If no direct match, try partial matching
        const sessionKeys = Object.keys(localSessions);
        for (const sessionKey of sessionKeys) {
            if (race.EventName && sessionKey.includes(race.EventName.toLowerCase().split(' ')[0])) {
                return localSessions[sessionKey];
            }
            if (race.Country && sessionKey.includes(race.Country.toLowerCase())) {
                return localSessions[sessionKey];
            }
        }

        return [];
    };

    return (
        <div className="h-screen w-full bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white px-4 py-4">
            {isLive ? (
                <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
                    <div className="flex-1 h-full">
                        <iframe
                            src="https://embedrun.store/embed/e1143ef0-3bc4-11f0-afb1-ecf4bbdafde4"
                            className="w-full h-full rounded-xl shadow-lg border border-red-600/40"
                            allowFullScreen
                            frameBorder="0"
                        ></iframe>
                    </div>
                    <div className="w-full md:w-[350px] h-full">
                        <iframe
                            src={`https://www.twitch.tv/embed/bigunit_42/chat?parent=${twitchParent}&darkpopout`}
                            className="rounded-xl shadow-lg w-full h-full border border-gray-800/80"
                            allowFullScreen
                            title="Twitch Chat"
                        ></iframe>

                        <a
                            href="https://www.twitch.tv/popout/bigunit_42/chat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-center text-gray-400 underline hover:text-red-400"
                        >
                            Having issues? Open chat in a new tab →
                        </a>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4">
                    <img
                        src="/f1_ferrari.jpeg"
                        alt="Formula 1 Placeholder"
                        className="w-full max-w-[600px] rounded-xl border border-red-500 shadow-xl"
                    />

                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent tracking-wide">
                        Live Coverage Coming Soon
                    </h1>

                    <div className="w-full space-y-4">
                        {isLoading ? (
                            <div className="text-sm text-gray-400">Loading upcoming races...</div>
                        ) : !nextRace ? (
                            <div className="text-sm text-gray-400 italic">No upcoming race.</div>
                        ) : (
                            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 space-y-2 shadow hover:border-red-500/50 transition-all duration-200">
                                <div className="text-lg font-bold text-white mb-1">{nextRace.EventName}</div>
                                <div className="text-sm text-gray-400 mb-3">{nextRace.Location}, {nextRace.Country}</div>

                                {getSessionsForRace(nextRace).map((session, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between px-2 py-1 hover:bg-gray-800/60 rounded transition"
                                    >
                                        <div className="text-left">
                                            <div className="text-sm text-gray-300">{session.time} (Berlin)</div>
                                            <div className="text-base font-medium text-white">{session.session}</div>
                                        </div>
                                        <Clock className="w-4 h-4 text-red-400" />
                                    </div>
                                ))}

                                {getSessionsForRace(nextRace).length === 0 && (
                                    <div className="text-sm text-gray-500 italic">Session times not available</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Live;
