﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface IGoalManager
    {
        IEnumerable<BasicGoal> GetGoals();
        IEnumerable<BasicGoal> GetGoalsForWeek(int weekNumber);
        BasicGoal CreateGoal(BasicGoal goal);
        Guid DeleteGoal(BasicGoal goal);
    }
    public class GoalManager : IGoalManager
    {
        private readonly IGoalRepository _goalRepository;
        public GoalManager(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }
        public BasicGoal CreateGoal(BasicGoal goal)
        {
            return _goalRepository.CreateGoal(goal);
        }

        public Guid DeleteGoal(BasicGoal goal)
        {
            return _goalRepository.DeleteGoal(goal);
        }

        public IEnumerable<BasicGoal> GetGoals()
        {
            List<BasicGoal> goals = _goalRepository.GetGoals().ToList();
            return goals;
        }

        public IEnumerable<BasicGoal> GetGoalsForWeek(int weekNumber)
        {
            List<BasicGoal> goals = _goalRepository.GetGoalsForWeek(weekNumber).ToList();
            return goals;
        }
    }

}