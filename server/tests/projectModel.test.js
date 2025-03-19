const { PrismaClient } = require("@prisma/client");
const { mockDeep } = require("jest-mock-extended");

const prisma = mockDeep(PrismaClient);

describe("Project Model Tests", () => {
  test("should create a new project", async () => {
    const mockProjectData = {
      name: "New Project",
      description: "A description of the new project",
      startDate: new Date(),
      endDate: new Date(),
      coverURL: "https://example.com/project-cover.jpg",
    };

    prisma.project.create.mockResolvedValue({
      id: 1,
      ...mockProjectData,
    });

    const newProject = await prisma.project.create({
      data: mockProjectData,
    });

    expect(newProject).toHaveProperty("id");
    expect(newProject.name).toBe("New Project");
    expect(newProject.description).toBe("A description of the new project");
    expect(newProject.coverURL).toBe("https://example.com/project-cover.jpg");
  });

  test("should retrieve a project by ID", async () => {
    const mockProject = {
      id: 1,
      name: "Existing Project",
      description: "A description of the existing project",
      startDate: new Date(),
      endDate: new Date(),
      coverURL: "https://example.com/project-cover.jpg",
    };

    prisma.project.findUnique.mockResolvedValue(mockProject);

    const project = await prisma.project.findUnique({
      where: { id: 1 },
    });

    expect(project).toHaveProperty("id", 1);
    expect(project.name).toBe("Existing Project");
    expect(project.description).toBe("A description of the existing project");
  });

  test("should add a user to a project team", async () => {
    const mockProjectTeam = {
      id: 1,
      projectId: 1,
      userId: 1,
    };

    prisma.projectTeam.create.mockResolvedValue(mockProjectTeam);

    const projectTeam = await prisma.projectTeam.create({
      data: {
        projectId: 1,
        userId: 1,
      },
    });

    expect(projectTeam).toHaveProperty("id", 1);
    expect(projectTeam.projectId).toBe(1);
    expect(projectTeam.userId).toBe(1);
  });

  test("should create a project invite", async () => {
    const mockInvite = {
      token: "unique-token",
      projectId: 1,
      expiresAt: new Date(),
    };

    prisma.projectInvite.create.mockResolvedValue(mockInvite);

    const invite = await prisma.projectInvite.create({
      data: mockInvite,
    });

    expect(invite).toHaveProperty("token", "unique-token");
    expect(invite.projectId).toBe(1);
  });
});
