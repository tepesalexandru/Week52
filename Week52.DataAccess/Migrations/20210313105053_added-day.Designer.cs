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
    [Migration("20210313105053_added-day")]
    partial class addedday
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicGoal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("WeekId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("WeekId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("DayCompleted")
                        .HasColumnType("int");

                    b.Property<int>("Estimation")
                        .HasColumnType("int");

                    b.Property<Guid>("GoalId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GoalId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicWeek", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("WeekNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Weeks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.Progress", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("BasicTaskId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Day")
                        .HasColumnType("int");

                    b.Property<int>("Minutes")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("BasicTaskId");

                    b.ToTable("Progress");
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

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicTask", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicGoal", "Goal")
                        .WithMany("Tasks")
                        .HasForeignKey("GoalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Goal");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.Progress", b =>
                {
                    b.HasOne("Week52.DataAccess.Entities.BasicTask", null)
                        .WithMany("ProgressByDay")
                        .HasForeignKey("BasicTaskId");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicGoal", b =>
                {
                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicTask", b =>
                {
                    b.Navigation("ProgressByDay");
                });

            modelBuilder.Entity("Week52.DataAccess.Entities.BasicWeek", b =>
                {
                    b.Navigation("Goals");
                });
#pragma warning restore 612, 618
        }
    }
}
