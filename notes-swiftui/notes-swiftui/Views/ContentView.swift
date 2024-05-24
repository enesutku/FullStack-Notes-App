// Created by Enes UTKU

import SwiftUI

struct ContentView: View {
    
    @State var notes = [Note]()
    @StateObject private var nm = NetworkManager()
    
    var body: some View {
        
        NavigationView {
            
            List(nm.notes) { note in
                Text("\(note.note)")
                    .padding()
                
            }
            .onAppear {
                nm.fetchNotes()
            }
            .navigationTitle("Notes")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(action: {
                        print("Add a note!")
                    }, label: {
                        Text("Add")
                    })
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
