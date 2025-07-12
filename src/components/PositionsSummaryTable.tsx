import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DetailedRaceResult } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

// Helper to get team color class (assuming it's defined elsewhere or copy it here)
const getTeamColorClass = (teamName: string | undefined): string => {
    if (!teamName) return 'gray';
    const simpleName = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (simpleName.includes('mclaren')) return 'mclaren';
    if (simpleName.includes('mercedes')) return 'mercedes';
    if (simpleName.includes('redbull')) return 'redbull';
    if (simpleName.includes('ferrari')) return 'ferrari';
    if (simpleName.includes('alpine')) return 'alpine';
    if (simpleName.includes('astonmartin')) return 'astonmartin';
    if (simpleName.includes('williams')) return 'williams';
    if (simpleName.includes('haas')) return 'haas';
    if (simpleName.includes('sauber')) return 'alfaromeo'; // Updated for 2024+
    if (simpleName.includes('racingbulls') || simpleName.includes('alphatauri')) return 'alphatauri';
    return 'gray';
}

// Define rookies by season year (assuming it's defined elsewhere or copy it here)
const rookiesByYear: { [year: string]: string[] } = {
  '2025': ['ANT', 'BOR', 'DOO', 'BEA', 'HAD', 'LAW'],
  '2024': ['BEA', 'COL'],
  '2023': ['PIA', 'SAR', 'DEV'],
  '2022': ['ZHO'],
  '2021': ['MSC', 'MAZ', 'TSU'],
  '2020': ['LAT'],
  '2019': ['NOR', 'RUS', 'ALB']
};

// Helper function to check if a driver is a rookie in a given year
const isRookie = (driverCode: string, year: number): boolean => {
  const yearStr = year.toString();
  return rookiesByYear[yearStr]?.includes(driverCode) || false;
};


interface PositionsSummaryTableProps {
    sessionResults?: DetailedRaceResult[];
    year: number;
}

const PositionsSummaryTable: React.FC<PositionsSummaryTableProps> = ({ sessionResults, year }) => {
    if (!sessionResults || sessionResults.length === 0) {
        return null; // Don't render if no results
    }

    const calculatedResults = sessionResults.map(result => {
        let placesChanged: number | null = null;
        // Ensure both grid and final position are numbers to calculate change
        if (typeof result.gridPosition === 'number' && typeof result.position === 'number' && result.gridPosition !== 0) { // Also check grid is not 0 (pit lane start)
            placesChanged = result.gridPosition - result.position;
        } else if (result.gridPosition === 0 && typeof result.position === 'number') {
             // Handle pit lane start: Compare to last grid position (or fixed number like 20/22?)
             // For simplicity, let's assume pit lane start counts as starting last (e.g., 20th)
             const effectiveGrid = sessionResults.length > 0 ? sessionResults.length : 20; // Use actual number of starters or default
             placesChanged = effectiveGrid - result.position;
        }
        return { ...result, placesChanged };
    }).sort((a, b) => (a.position ?? 99) - (b.position ?? 99)); // Sort by final position

    const renderPlacesChanged = (change: number | null, gridPos: number | undefined) => {
        if (gridPos === 0) {
            // Indicate pit lane start in the change cell?
            return <span className="text-gray-400 text-xs italic">Pit Lane</span>;
        }
        if (change === null || change === 0) {
            return <span className="text-gray-400 flex items-center justify-center"><Minus className="w-3 h-3 mr-1 opacity-70"/> 0</span>;
        } else if (change > 0) {
            return <span className="text-green-400 flex items-center justify-center"><ArrowUp className="w-3 h-3 mr-1"/> +{change}</span>;
        } else {
            return <span className="text-red-400 flex items-center justify-center"><ArrowDown className="w-3 h-3 mr-1"/> {change}</span>;
        }
    };

    return (
        <Card className="bg-gray-900/70 border border-gray-700/80 backdrop-blur-sm animate-fade-in mt-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Places Gained/Lost Summary</CardTitle>
                <CardDescription className="text-xs text-gray-400">Comparison between starting grid and final position. Pit lane starts indicated.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-800/50">
                            <TableRow className="border-gray-700">
                                <TableHead className="w-[50px] text-center text-white font-semibold">Pos</TableHead>
                                <TableHead className="text-white font-semibold">Driver</TableHead>
                                <TableHead className="text-white font-semibold">Team</TableHead>
                                <TableHead className="w-[70px] text-center text-white font-semibold">Grid</TableHead>
                                <TableHead className="w-[90px] text-center text-white font-semibold">Change</TableHead>
                                <TableHead className="text-white font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {calculatedResults.map((res) => (
                                <TableRow key={res.driverCode} className="border-gray-700/50 hover:bg-gray-800/40 transition-colors">
                                    <TableCell className="text-center font-medium">{res.position ?? '-'}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{res.fullName}</span>
                                            {isRookie(res.driverCode, year) && (
                                                <span className="text-xs px-1.5 py-0.5 bg-blue-600/40 text-blue-200 rounded font-medium">R</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="flex items-center gap-2">
                                            <span className={cn("w-2 h-2 rounded-full", `bg-f1-${getTeamColorClass(res.team)}`)}></span>
                                            {res.team}
                                        </span>
                                    </TableCell>
                                     <TableCell className="text-center">{res.gridPosition === 0 ? 'PL' : res.gridPosition ?? '-'}</TableCell>
                                    <TableCell className="text-center font-mono text-xs">
                                        {renderPlacesChanged(res.placesChanged, res.gridPosition)}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-300">{res.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default PositionsSummaryTable; 