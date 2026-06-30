        try:
            from qiskit import QuantumCircuit
            
            qc = QuantumCircuit(3, 3)
            qc.h(0)
            qc.measure(0, 0)
            
            qc.save_statevector()