import Foundation

class NetworkManager: ObservableObject {
    
    @Published var notes = [Note]()
    
    func fetchNotes() {
        let url = URL(string: "http://localhost:3000/notes")!
        
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data else { return }
            
            do {
                let notes = try JSONDecoder().decode([Note].self, from: data)
                self.notes = notes
            } catch {
                print("DEBUG: \(error)")
            }
        }
        
        task.resume()
        
    }
}
