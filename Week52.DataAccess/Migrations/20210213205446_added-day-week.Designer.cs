﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Week52.DataAccess.Context;

namespace Week52.DataAccess.Migrations
{
    [DbContext(typeof(Week52DbContext))]
    [Migration("20210213205446_added-day-week")]
    partial class addeddayweek
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicDay", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("DayNumber")
                        .HasColumnType("int");

                    b.Property<Guid>("WeekId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("WeekId");

                    b.ToTable("Days");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicGoal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("WeekId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("WeekId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicProgress", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("BasicDayId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("GoalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Progress")
                        .HasColumnType("int");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("BasicDayId");

                    b.ToTable("Progress");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<Guid>("GoalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GoalId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicWeek", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("WeekNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Weeks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicDay", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicWeek", "Week")
                        .WithMany("Days")
                        .HasForeignKey("WeekId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Week");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicGoal", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicWeek", "Week")
                        .WithMany("Goals")
                        .HasForeignKey("WeekId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Week");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicProgress", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicDay", null)
                        .WithMany("Overview")
                        .HasForeignKey("BasicDayId");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicTask", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicGoal", "Goal")
                        .WithMany("Tasks")
                        .HasForeignKey("GoalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Goal");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicDay", b =>
                {
                    b.Navigation("Overview");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicGoal", b =>
                {
                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicWeek", b =>
                {
                    b.Navigation("Days");

                    b.Navigation("Goals");
                });
#pragma warning restore 612, 618
        }
    }
}