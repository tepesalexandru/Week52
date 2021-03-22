import React, { ReactElement, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tag } from "../../shared/Interfaces";
import { getProgressOnAllTags } from "../Weekly/Services/tagService";

interface Props {
  tags: Tag[];
  userId: string;
}

interface TagProgress {
  tagId: string;
  name: string;
  totalEstimations: number;
  totalActive: number;
}

export default function TagsBarChart(props: Props): ReactElement {
  const [progressOnTags, setProgressOnTags] = useState<TagProgress[]>([]);

  useEffect(() => {
    getProgressOnAllTags(props.userId).then((data: TagProgress[]) => {
      function compare(a: TagProgress, b: TagProgress) {
        if (b.totalEstimations === a.totalEstimations) {
            return b.totalActive - a.totalActive;
        }
        return b.totalEstimations - a.totalEstimations;
      }
      data.sort(compare);
      setProgressOnTags(data);
    });
  }, [props.userId]);
  const generateDate = () => {
    return progressOnTags.map((tagProgress: TagProgress) => {
      return {
        name: tagProgress.name,
        estimations: tagProgress.totalEstimations,
        actual: tagProgress.totalActive
      };
    });
  };

  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={generateDate()}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="estimations" fill="#8884d8" />
        <Bar dataKey="actual" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
