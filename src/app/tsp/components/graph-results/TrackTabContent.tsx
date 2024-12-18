import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useGraphState } from '@/store/useGraphStore';
import VisualizeTrack from './VisualizeTrack';
import { useParseResultData } from '../../hooks/useParseResultData';
import { TabsContent } from '@/types';
import { useState } from 'react';

export default function TrackTabContent() {
  const [ edge, setEdge ] = useState<number | null>(null);
  const { graph } = useGraphState();
  const { parseResult } = useParseResultData();
  const data: TabsContent = parseResult();

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
  <div className="flex-1 md:w-2/3 h-full">
    <Card className="h-full">
      <div className="flex justify-center overflow-hidden items-center border-t border-gray-200 h-full">
        <VisualizeTrack path={data.path} edge={edge} /> 
      </div>
    </Card>
  </div>
  <div className="w-full flex-1 md:w-1/3 h-full">
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Path Tracking</CardTitle>
        <CardDescription>Optimal route: {data.length.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ScrollArea className="h-[387px]">
          <div className="flex flex-col gap-2 h-full">
            {data.path.map((source: string, index: number) => (
              index === data.path.length - 1 ? null : (
                <div
                  key={index}
                  className="flex cursor-pointer items-center w-full bg-gray-50 rounded-lg px-4 py-2 transition hover:bg-gray-100"
                  onClick={() => setEdge(index)}
                >
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full mr-3">
                    {index + 1}
                  </Badge>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700">{source}</span>
                    <span className="text-xs text-gray-500">
                      To {data.path[index + 1]}: {
                        graph.links.find(
                          (link) =>
                            ((typeof link.source === 'string' ? link.source : link.source.id) === source &&
                            (typeof link.target === 'string' ? link.target : link.target.id) === data.path[index + 1]) ||
                            ((typeof link.target === 'string' ? link.target : link.target.id) === data.path[index + 1])
                        )?.weight.toFixed(2) || 'N/A'
                      }
                    </span>
                  </div>
                  {index < data.path.length - 1 && (
                    <ArrowRight className="ml-auto text-gray-400 transition-colors hover:text-gray-600" />
                  )}
                </div>
              )
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-1 mt-6 text-xs text-gray-600">
          <MapPin className="w-3 h-3 text-gray-500" />
          <span>Total: {data.path.length ? data.path.length - 1 : 0}</span>
        </div>
      </CardContent>
    </Card>
  </div>
</div>

  );
}
