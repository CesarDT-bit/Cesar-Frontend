class ProfileService {
  constructor() {
    this.baseURL = 'http://localhost:8000';
    this.apiURL = `${this.baseURL}/api`;
    this.useMock = true; // 🔥 CAMBIA A TRUE
  }

  getRequestConfig() {
    return {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
  }

  async simulateNetworkDelay() {
    return new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  }

  getMockProfile() {
    return {
      id: 1,
      name: "Carlos",
      email: "carlos@ejemplo.com",
      email_verified_at: null,
      created_at: "2024-01-15T00:00:00.000000Z",
      updated_at: "2024-10-20T00:00:00.000000Z",
      paternal_lastname: "Rodríguez",
      maternal_lastname: "López",
      user_name: "carlos_dev",
      phone: "+52 55 1234 5678",
      image_url: null,
      role: "Desarrollador Full Stack",
      country: "México",
      bio: "Desarrollador apasionado por crear soluciones innovadoras con código limpio y mejores prácticas.",
      social_links: {
        github: "https://github.com/carlosdev",
        linkedin: "https://linkedin.com/in/carlosrodriguez",
        twitter: "https://twitter.com/carlosdev"
      }
    };
  }

  async getProfile() {
    // 🔥 SIEMPRE USAR MOCK POR AHORA
    if (this.useMock) {
      await this.simulateNetworkDelay();
      return this.getMockProfile();
    }

    try {
      const response = await fetch(`${this.apiURL}/user`, {
        method: 'GET',
        ...this.getRequestConfig(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('API call failed:', error.message);
      throw error;
    }
  }

  async updateProfile(profileData) {
    // 🔥 SIEMPRE USAR MOCK POR AHORA
    if (this.useMock) {
      await this.simulateNetworkDelay();
      const updatedProfile = { ...this.getMockProfile(), ...profileData };
      return updatedProfile;
    }

    try {
      const response = await fetch(`${this.apiURL}/profile`, {
        method: 'PUT',
        ...this.getRequestConfig(),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Update API call failed:', error.message);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
export default profileService;