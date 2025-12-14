"use client"

import React, { useMemo } from 'react'
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6384', '#36a2eb', '#cc65fe', '#ffce56']

interface ChartRendererProps {
    config: any
}

// Helper to determine keys and clean data similarly to the original robust logic
function prepareData(data: any[]) {
    if (!Array.isArray(data) || data.length === 0) return { data: [], xKey: '', yKey: '' };

    // 1. Identify X Axis Key (Categorical) -> labels
    // Original logic: d.month || d.mes || d.category || d.country || d.País || keys[0]
    const sample = data[0];
    const keys = Object.keys(sample);

    let xKey = keys.find(k => ['month', 'mes', 'category', 'country', 'pais', 'país', 'name', 'nombre', 'stage'].includes(k.toLowerCase()));
    if (!xKey) {
        // Fallback: use the first key that is likely a string
        xKey = keys.find(k => typeof sample[k] === 'string') || keys[0];
    }

    // 2. Identify Y Axis Key (Numerical) -> values
    // Original logic: d.value || d.sales || d.revenue || d.limit || d.Volumen || values[1]
    let yKey = keys.find(k => ['value', 'sales', 'revenue', 'count', 'limit', 'volumen', 'amount', 'total'].includes(k.toLowerCase()));

    // If explicit key not found, look for numeric values or use the second key if available (common in [label, value] structures)
    if (!yKey) {
        const potentialYKey = keys.find(k => k !== xKey && (typeof sample[k] === 'number' || (typeof sample[k] === 'string' && !isNaN(parseFloat(sample[k].replace(/[^0-9.-]/g, ''))))));
        yKey = potentialYKey || (keys.length > 1 ? keys[1] : keys[0]);
    }

    // 3. Clean Data (Parse numbers like "$1,000" -> 1000)
    const cleanedData = data.map(item => {
        const newItem = { ...item };
        const rawVal = item[yKey];

        // Robust parsing logic from original code
        if (typeof rawVal === 'string') {
            const numericVal = parseFloat(rawVal.replace(/[^0-9.-]/g, ''));
            newItem[yKey] = isNaN(numericVal) ? 0 : numericVal;
        } else if (typeof rawVal === 'number') {
            newItem[yKey] = rawVal;
        } else {
            newItem[yKey] = 0;
        }
        return newItem;
    });

    return { data: cleanedData, xKey, yKey };
}

export function ChartRenderer({ config }: ChartRendererProps) {
    const { data: processedData, xKey, yKey } = useMemo(() => prepareData(config?.data), [config?.data]);

    if (!config) return null

    // Fallback: If data is meant to be a chart but has no numeric values (processedData is all 0s), render as table.
    // This handles cases where AI suggests 'bar_chart' for categorical text data.
    const isChartType = ['line_chart', 'bar_chart', 'pie_chart', 'area_chart', 'horizontal_bar_chart', 'funnel_chart', 'gauge_chart'].includes(config.type);
    const hasNumericData = processedData.some((d: any) => d[yKey] !== 0);

    // Override type to table if it's a chart with no valid numbers
    const renderType = (isChartType && !hasNumericData) ? 'table' : config.type;

    const renderContent = () => {
        switch (renderType) {
            case 'text':
            case 'text_summary':
                const textContent = Array.isArray(config.data)
                    ? config.data.map((item: any) => typeof item === 'string' ? item : JSON.stringify(item, null, 2)).join('\n')
                    : (typeof config.data === 'object' ? JSON.stringify(config.data, null, 2) : config.data);
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-muted-foreground text-sm">{textContent}</p>
                    </div>
                )

            case 'line_chart':
            case 'area_chart':
                return (
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={processedData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
                                <XAxis
                                    dataKey={xKey}
                                    className="text-xs"
                                    stroke="#888888"
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis
                                    className="text-xs"
                                    stroke="#888888"
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--popover))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '8px',
                                        color: 'hsl(var(--popover-foreground))',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey={yKey}
                                    stroke={config.options?.colors?.[0] || "#3b82f6"}
                                    strokeWidth={2}
                                    activeDot={{ r: 6 }}
                                    name={config.title || "Value"}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )

            case 'bar_chart':
            case 'horizontal_bar_chart':
            case 'funnel_chart':
                const isHorizontal = config.type === 'horizontal_bar_chart' || config.type === 'funnel_chart';
                return (
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={processedData} layout={isHorizontal ? 'vertical' : 'horizontal'}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" horizontal={!isHorizontal} vertical={isHorizontal} />
                                {isHorizontal ? (
                                    <>
                                        <XAxis type="number" className="text-xs" stroke="#888888" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                        <YAxis
                                            type="category"
                                            dataKey={xKey}
                                            className="text-xs"
                                            width={100}
                                            stroke="#888888"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <XAxis
                                            dataKey={xKey}
                                            className="text-xs"
                                            stroke="#888888"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <YAxis className="text-xs" stroke="#888888" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                    </>
                                )}
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--popover))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '8px',
                                        color: 'hsl(var(--popover-foreground))',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                {/* <Legend /> */}
                                <Bar
                                    dataKey={yKey}
                                    fill={config.options?.colors?.[0] || "#8884d8"}
                                    radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                                    name={config.title || "Value"}
                                >
                                    {processedData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={config.options?.colors?.[index % (config.options?.colors?.length || COLORS.length)] || COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )

            case 'pie_chart':
            case 'gauge_chart': // Pie can substitute gauge roughly
                return (
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={processedData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={config.type === 'gauge_chart' ? 60 : 0}
                                    labelLine={false}
                                    label={({ name, percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey={yKey}
                                    nameKey={xKey}
                                >
                                    {processedData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={config.options?.colors?.[index % (config.options?.colors?.length || COLORS.length)] || COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--popover))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '8px',
                                        color: 'hsl(var(--popover-foreground))',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        {config.type === 'gauge_chart' && (
                            <div className="text-center -mt-8 font-bold text-2xl">
                                {processedData[0]?.[yKey]}
                            </div>
                        )}
                    </div>
                )

            case 'cards':
            case 'kpi_cards':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {config.data.map((item: any, i: number) => {
                            const keys = Object.keys(item);
                            const titleKey = keys.find(k => ['title', 'label', 'name', 'metric', 'kpi'].includes(k.toLowerCase())) || keys[0];
                            const valueKey = keys.find(k => ['value', 'amount', 'number', 'detail', 'volume', 'limit'].includes(k.toLowerCase())) || (keys.length > 1 ? keys[1] : keys[0]);
                            const unitKey = keys.find(k => ['unit', 'subtext'].includes(k.toLowerCase()));

                            return (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl border border-border/50 bg-card hover:shadow-md transition-all flex flex-col justify-between"
                                    style={{ borderTopWidth: '4px', borderTopColor: config.options?.colors?.[i % (config.options?.colors?.length || COLORS.length)] || COLORS[i % COLORS.length] }}
                                >
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">{item[titleKey]}</h4>
                                        {item.details && Array.isArray(item.details) ? (
                                            <ul className="mt-2 text-xs space-y-1 text-foreground/80">
                                                {item.details.map((d: string, idx: number) => <li key={idx}>• {d}</li>)}
                                            </ul>
                                        ) : (
                                            <div className="text-2xl font-bold text-foreground break-all md:break-words">
                                                <span className={typeof item[valueKey] === 'string' && item[valueKey].length > 20 ? "text-lg" : "text-2xl"}>
                                                    {item[valueKey]}
                                                </span>
                                                {unitKey && <span className="text-sm font-normal text-muted-foreground ml-1">{item[unitKey]}</span>}
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags support for Meeting Summaries style */}
                                    {item.tags && Array.isArray(item.tags) && (
                                        <div className="mt-3 pt-2 border-t border-border/30 flex flex-wrap gap-2">
                                            {item.tags.map((tag: string, idx: number) => (
                                                <span key={`tag-${idx}`} className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {!item.details && !Array.isArray(item.details) && Object.keys(item).length > 2 && (
                                        <div className="mt-3 text-xs text-muted-foreground border-t border-border/30 pt-2 break-all">
                                            {Object.entries(item)
                                                .filter(([k]) => k !== titleKey && k !== valueKey && k !== unitKey && k !== 'tags')
                                                .map(([k, v]) => <div key={k} className="mb-1"><span className="font-semibold">{k}:</span> {v as any}</div>)
                                            }
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )

            case 'table':
            case 'geo_table':
            case 'heatmap': // Simple table fallback for heatmap for now
                return (
                    <div className="overflow-x-auto mt-4 rounded-lg border border-border/50">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
                                <tr>
                                    {Object.keys(config.data[0] || {}).map(key => <th key={key} className="px-4 py-3">{key}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {config.data.map((row: any, i: number) => (
                                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                                        {Object.values(row).map((val: any, j) => <td key={j} className="px-4 py-3">{typeof val === 'object' ? JSON.stringify(val) : val}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )

            case 'timeline':
                return (
                    <div className="space-y-4 mt-4">
                        {config.data.map((event: any, i: number) => {
                            const keys = Object.keys(event);
                            const dateKey = keys.find(k => k.toLowerCase().includes('date') || k.toLowerCase().includes('fecha')) || keys[0];
                            const eventKey = keys.find(k => k.toLowerCase().includes('event') || k.toLowerCase().includes('title') || k.toLowerCase().includes('desc')) || keys[1];

                            return (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="min-w-[100px] text-sm text-muted-foreground text-right pt-1">{event[dateKey]}</div>
                                    <div className="relative pl-6 pb-4 border-l border-border group-last:border-transparent group-last:pb-0">
                                        <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                                        <p className="text-sm text-foreground">{event[eventKey]}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )

            case 'mixed_layout':
                return (
                    <div className="grid grid-cols-1 gap-6 mt-4">
                        {config.options?.sub_components?.map((sub: any, i: number) => (
                            <Card key={i} className="p-6 border-border/50 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-foreground/90">{sub.title}</h3>
                                <ChartRenderer config={sub} />
                            </Card>
                        ))}
                    </div>
                )

            default:
                return <div className="p-4 text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg">Tipo de visualización no soportado: {config.type}</div>
        }
    }

    return (
        <div className="w-full animate-in fade-in zoom-in duration-300">
            {config.type !== 'mixed_layout' && <h3 className="text-lg font-semibold mb-2 text-foreground/90">{config.title}</h3>}
            {renderContent()}
        </div>
    )
}
